import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
export interface VendorWallet {
    getAccountKey(address: string, passphrase?: string): Promise<string>;
    configurePassphrase(passphrase: string): any;
    enable(): any;
    askPassphrase(passphrase: string): any;
    subscribeToAskPassphrase: () => Promise<void>;
    subscribeToSigning: () => Promise<void>;
}
export declare class ReadOnlyWallet implements VendorWallet {
    getAccountKey(address: string, passphrase?: string): Promise<string>;
    configurePassphrase(passphrase: string): string;
    enable(): boolean;
    askPassphrase(passphrase: string): void;
    subscribeToAskPassphrase: () => Promise<void>;
    subscribeToSigning: () => Promise<void>;
    askPassphraseValue: string;
}
export declare class Wallet implements VendorWallet {
    keyStore: KeyStore;
    keyHandler: KeyHandler;
    constructor();
    askPassphraseValue: string;
    subscribeToAskPassphrase: () => Promise<void>;
    subscribeToSigning: () => Promise<void>;
    enable(): Promise<void>;
    askPassphrase(passphrase: string): void;
    configurePassphrase(passphrase: string): any;
    validatePassphrase(passphrase: string, promiseFn: Promise<any>): Promise<any>;
    getAccountKey(address: string, passphrase?: string): Promise<string>;
    getAccounts(): Promise<string[]>;
    registerAccount(address: string, privateKey: string, passphrase?: string): Promise<any>;
    internalCreateAccount(canReturnMnemonicValue?: boolean): Promise<{
        publicAddress: string;
        mnemonic: string;
    } | {
        publicAddress: string;
        mnemonic?: undefined;
    }>;
    createAccount(passphrase?: string, canReturnMnemonicValue?: boolean): Promise<any>;
}
