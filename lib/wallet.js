"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webcrypto_keychain_1 = require("@decent-bet/webcrypto-keychain");
const ethers_1 = require("ethers");
const bip39 = __importStar(require("bip39"));
const VET_DERIVATION = `m/44'/818'/0'/0/0`;
class ReadOnlyWallet {
    getAccountKey(address, passphrase) {
        throw new Error('This is a read only wallet, cannot get key to sign transactions');
    }
    configurePassphrase(passphrase) {
        return passphrase;
    }
}
exports.ReadOnlyWallet = ReadOnlyWallet;
class Wallet {
    constructor() {
        this.keyStore = new webcrypto_keychain_1.KeyStore();
        this.keyHandler = new webcrypto_keychain_1.KeyHandler(this.keyStore);
    }
    configurePassphrase(passphrase) {
        if (passphrase && passphrase.length < 10) {
            return new Error('Passphrase must be greater than 10 characters');
        }
        return this.keyHandler.writeSecureValue('passphrase', passphrase);
    }
    async validatePassphrase(passphrase, promiseFn) {
        const temp = passphrase;
        if (!passphrase) {
            const compareUserPassphrase = await this.subscribeToAskPassphrase();
            passphrase = compareUserPassphrase;
        }
        const comparePassphrase = await this.keyHandler.getSecureValue('passphrase');
        if (passphrase === comparePassphrase) {
            return await promiseFn;
        }
        else {
            throw new Error('Invalid passphrase');
        }
    }
    async getAccountKey(address, passphrase) {
        return await this.validatePassphrase(passphrase, this.keyHandler.getSecureValue(address));
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
        const wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic, VET_DERIVATION);
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
exports.Wallet = Wallet;
