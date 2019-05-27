import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';
const VET_DERIVATION = `m/44'/818'/0'/0/0`;
export class ReadOnlyWallet {
    getAccountKey(address, passphrase) {
        throw new Error('This is a read only wallet, cannot get key to sign transactions');
    }
    configurePassphrase(passphrase) {
        return passphrase;
    }
    enable() {
        return true;
    }
    askPassphrase(passphrase) {
        this.askPassphraseValue = passphrase;
    }
}
export class Wallet {
    constructor() {
        this.keyStore = new KeyStore();
        this.keyHandler = new KeyHandler(this.keyStore);
    }
    async enable() {
        if (this.subscribeToAskPassphrase) {
            await this.subscribeToAskPassphrase();
        }
    }
    askPassphrase(passphrase) {
        this.askPassphraseValue = passphrase;
    }
    configurePassphrase(passphrase) {
        if (passphrase && passphrase.length < 10) {
            return new Error('Passphrase must be greater than 10 characters');
        }
        return this.keyHandler.writeSecureValue('passphrase', passphrase);
    }
    async validatePassphrase(passphrase, promiseFn) {
        let comparePassphrase = this.askPassphraseValue;
        if (!this.askPassphrase) {
            comparePassphrase = await this.keyHandler.readSecureValue('passphrase');
        }
        if (passphrase === comparePassphrase) {
            return await promiseFn;
        }
        else {
            throw new Error('Invalid passphrase');
        }
    }
    async getAccountKey(address, passphrase) {
        return await this.validatePassphrase(passphrase, this.keyHandler.readSecureValue(address));
    }
    async getAccounts() {
        const keys = await this.keyStore.getAllVariables();
        return keys;
    }
    async registerAccount(address, privateKey, passphrase) {
        return await this.validatePassphrase(passphrase, this.keyHandler.writeSecureValue(address, privateKey));
    }
    async internalCreateAccount(canReturnMnemonicValue) {
        const mnemonic = bip39.generateMnemonic();
        const wallet = ethers.Wallet.fromMnemonic(mnemonic, VET_DERIVATION);
        await this.keyHandler.writeSecureValue(wallet.address, wallet.privateKey);
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
    async createAccount(passphrase, canReturnMnemonicValue) {
        return await this.validatePassphrase(passphrase, this.internalCreateAccount(canReturnMnemonicValue));
    }
}
