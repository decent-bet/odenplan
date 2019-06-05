import WalletConnect from '@walletconnect/browser';
export interface IWalletConnectDappProvider {
    processTransaction(txParams: any): Promise<WalletConnect>;
    processSignTransaction(txParams: any): Promise<WalletConnect>;
    processMessage(msgParams: any): Promise<WalletConnect>;
    processPersonalMessage(msgParams: any): Promise<WalletConnect>;
    processTypedMessage(msgParams: any): Promise<WalletConnect>;
    getAccounts(cb: () => {}): Promise<void>;
    send(payload: any, callback: any): Promise<any>;
    enable(): Promise<any>;
    getWalletConnector(): Promise<WalletConnect>;
    start: () => void;
}
export declare class WalletConnectImpl implements IWalletConnectDappProvider {
    qrcode: boolean;
    bridge: any;
    walletConnector: WalletConnect;
    isWalletConnect: boolean;
    constructor(options: any);
    processTransaction(txParams: any): Promise<WalletConnect>;
    processSignTransaction(txParams: any): Promise<WalletConnect>;
    processMessage(msgParams: any): Promise<WalletConnect>;
    processPersonalMessage(msgParams: any): Promise<WalletConnect>;
    processTypedMessage(msgParams: any): Promise<WalletConnect>;
    getAccounts(cb: any): Promise<void>;
    send(payload: any, callback: any): Promise<any>;
    enable(): Promise<any>;
    getWalletConnector(): Promise<WalletConnect>;
    start: () => void;
}
