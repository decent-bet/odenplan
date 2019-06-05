import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';
const VET_DERIVATION = `m/44'/818'/0'/0/0`;

/**
 * VendorWallet is an interface to integrate with Connex
 */
export interface VendorWallet {
    /**
     * Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called
     * @param address A public address
     * @param passphrase Passphrase to unlock
     */
    getAccountKey(address: string, passphrase?: string): Promise<string>;

    /**
     * Configures a passphrase to lock and unlock keys
     * @param passphrase A passphrase
     */
    configurePassphrase(passphrase: string): void;

    /**
     * Callback to set passphrase
     */
    subscribeToAskPassphrase: () => Promise<any>;

    /**
     * Callback to approve or reject signing
     */
    subscribeToSigning: () => Promise<any>;
}


/**
 * A simple VET wallet
 */
export class Wallet implements VendorWallet {
    public keyStore: KeyStore;
    public keyHandler: KeyHandler;


    constructor() {
        this.keyStore = new KeyStore();
        this.keyHandler = new KeyHandler(this.keyStore);
    }

    askPassphraseValue: string;

    /**
     * Callback to set passphrase
     */
    subscribeToAskPassphrase: () => Promise<string>;

    /**
     * Callback to approve or reject signing
     */
    subscribeToSigning: () => Promise<string>;


    // async enable() {
    //     if (this.subscribeToAskPassphrase) {
    //         await this.subscribeToAskPassphrase();
    //     }
    // }

    /**
     * Configures a passphrase to lock and unlock keys
     * @param passphrase A passphrase
     */
    configurePassphrase(passphrase: string) {
        // TODO: Add passphrase complexity check here
        if (passphrase && passphrase.length < 10) {
            return new Error('Passphrase must be greater than 10 characters')
        }
        return this.keyHandler.writeSecureValue('passphrase', passphrase);
    }

    /**
     * Asks for passphrase and if succesful, executes promise
     * @param passphrase 
     * @param promiseFn 
     */
    async validatePassphrase(passphrase: string, promiseFn: Promise<any>) {
        const temp = passphrase;
        if (!passphrase) {
            const compareUserPassphrase = await this.subscribeToAskPassphrase();
            passphrase = compareUserPassphrase;
        }
        // Read from store
        const comparePassphrase = await this.keyHandler.getSecureValue('passphrase');

        if (passphrase === comparePassphrase) {
            // Read value
            return await promiseFn;
        } else {
            throw new Error('Invalid passphrase');
        }
    }

    /**
     * Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called
     * @param address A public address
     * @param passphrase Passphrase to unlock
     */
    async getAccountKey(address: string, passphrase?: string): Promise<string> {
        return await this.validatePassphrase(
            passphrase,
            this.keyHandler.getSecureValue(address)
        );
    }

    /**
     * Gets a list of all accounts registered
     */
    async getAccounts(): Promise<string[]> {
        // read keys currently store
        const keys = await this.keyStore.getAllVariables();
        return keys;
    }

    /**
     * Writes a private key given a public address
     * @param address public address
     * @param privateKey private key
     */
    async registerAccount(address: string, privateKey: string, passphrase?: string) {
        return await this.validatePassphrase(
            passphrase,
            this.keyHandler.writeSecureValue(address, privateKey)
        );
    }

    /**
     * Create account and returns a public address
     * @param canReturnMnemonicValue Set to true if mnemonic should be in the result
     */
    private async internalCreateAccount(canReturnMnemonicValue?: boolean) {
        const mnemonic = bip39.generateMnemonic();
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, VET_DERIVATION);

        await this.keyHandler.writeSecureValue(
            wallet.address,
            wallet.privateKey
        );

        if (canReturnMnemonicValue) {
            return {
                publicAddress: wallet.address,
                mnemonic,
            };
        }
        return {
            publicAddress: wallet.address
        };
    }

    /**
     * Creates a new account
     * @param passphrase Passphrase
     * @param canReturnMnemonicValue Returns mnemonic if set to true, defauls to false
     */
    async createAccount(passphrase?: string, canReturnMnemonicValue?: boolean) {
        return await this.validatePassphrase(
            passphrase,
            this.internalCreateAccount(canReturnMnemonicValue),
        );
    }
}