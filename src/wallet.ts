import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';
const VET_DERIVATION = `m/44'/818'/0'/0/0`;

export interface VendorWallet {
    getAccountKey(address: string, passphrase?: string): Promise<string>;
    configurePassphrase(passphrase: string): void;
    enable(): void;
    askPassphrase(passphrase: string): void;
    // Callback to set passphrase
    subscribeToAskPassphrase: () => Promise<any>;
    // Callback to approve or reject signing
    subscribeToSigning: () => Promise<any>;
}

export class ReadOnlyWallet implements VendorWallet {
    getAccountKey(address: string, passphrase?: string): Promise<string> {
        throw new Error('This is a read only wallet, cannot get key to sign transactions');
    }

    configurePassphrase(passphrase: string) {
        return passphrase;
    }

    enable() {
        return true;
    }
    askPassphrase(passphrase: string) {
        this.askPassphraseValue = passphrase;
    }
    // Callback to set passphrase    
    subscribeToAskPassphrase: () => Promise<void>;

    // Callback to approve or reject signing
    subscribeToSigning: () => Promise<void>;

    askPassphraseValue: string;
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

    // Callback to set passphrase
    subscribeToAskPassphrase: () => Promise<any>;

    // Callback to approve or reject signing
    subscribeToSigning: () => Promise<any>;

    async enable() {
        if (this.subscribeToAskPassphrase) {
            await this.subscribeToAskPassphrase();
        }
    }

    askPassphrase(passphrase: string) {
        // TODO: Unlocked required
        this.askPassphraseValue = passphrase;
    }

    /**
     * Sets a passphrase for the wallet
     * @param passphrase Passphrase
     */
    configurePassphrase(passphrase: string) {
        // TODO: Add passphrase complexity check here
        if (passphrase && passphrase.length < 10) {
            return new Error('Passphrase must be greater than 10 characters')
        }
        return this.keyHandler.writeSecureValue('passphrase', passphrase);
    }

    async validatePassphrase(passphrase: string, promiseFn: Promise<any>) {
        let comparePassphrase = this.askPassphraseValue;
        if (!this.askPassphrase) {
            comparePassphrase = await this.keyHandler.readSecureValue('passphrase');
        }
        if (passphrase === comparePassphrase) {
            // Read value
            return await promiseFn;
        } else {
            throw new Error('Invalid passphrase');
        }
    }
    /**
     * Reads a private key given a public address
     * @param address public address
     * @param passphrase passphrase for the wallet
     */
    async getAccountKey(address: string, passphrase?: string): Promise<string> {
        return await this.validatePassphrase(
            passphrase,
            this.keyHandler.readSecureValue(address)
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
    async internalCreateAccount(canReturnMnemonicValue?: boolean) {
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

    async createAccount(passphrase?: string, canReturnMnemonicValue?: boolean) {
        return await this.validatePassphrase(
            passphrase,
            this.internalCreateAccount(canReturnMnemonicValue),
        );
    }
}