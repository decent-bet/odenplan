import WalletConnect from '@walletconnect/browser';
export declare class WalletConnectConnex {
    walletConnector: WalletConnect;
    constructor(walletConnect: WalletConnect);
    handleCallRequests(error: any, payload: any): Promise<void>;
    private sendTransaction;
    private signTransaction;
    private signMessage;
    private signPersonalMessage;
}
