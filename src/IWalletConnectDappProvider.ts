import WalletConnect from '@walletconnect/browser'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'

export interface IWalletConnectDappProvider {
    processTransaction(txParams, cb: () => {}): Promise<void>;
    processSignTransaction(txParams, cb: () => {}): Promise<void>;
    processMessage(msgParams, cb: () => {}): Promise<void>;
    processPersonalMessage(msgParams, cb: () => {}): Promise<void>;
    processTypedMessage(msgParams, cb: () => {}): Promise<void>;
    getAccounts(cb: () => {}): Promise<void>;
    send(payload, callback): Promise<any>;
    enable(): Promise<any>;
    getWalletConnector(): Promise<void>;
    start: () => void;
}

export class WalletConnectImpl implements IWalletConnectDappProvider {
    qrcode: boolean;
    bridge: any;
    walletConnector: WalletConnect;
    isWalletConnect: boolean;

    constructor(connector: WalletConnect, options: any) {
        this.qrcode = typeof options.qrcode === 'undefined' || options.qrcode !== false;
        this.bridge = options.bridge || null;

        if (!bridge || typeof bridge !== 'string') {
            throw new Error('Missing or Invalid bridge field')
        }

        this.walletConnector = connector;
        this.isWalletConnect = true;
    }

    async processTransaction(txParams: any, cb): Promise<void> {
        const walletConnector = await this.getWalletConnector()
        try {
          const result = await walletConnector.sendTransaction(txParams)
          cb(null, result);
        } catch (error) {
          cb(error);
        }
    }

    async processSignTransaction(txParams: any, cb): Promise<void> {
        const walletConnector = await this.getWalletConnector()
        try {
          const result = await walletConnector.signTransaction(txParams)
          cb(null, result);
        } catch (error) {
          cb(error);
        }
    }

    async processMessage(msgParams: any, onAction: Promise<any>): Promise<void> {
        // const result = await walletConnector.signMessage(msgParams)
    }

    async processPersonalMessage(msgParams: any, onAction: Promise<any>): Promise<void> {
        // const result = await walletConnector.signPersonalMessage(msgParams)
    }
    
    async processTypedMessage(msgParams: any, onAction: Promise<any>): Promise<void> {
        // const result = await walletConnector.signTypedData(msgParams)
    }

    async getAccounts(onAction: Promise<any>): Promise<void> {
        // const walletConnector = await engine.getWalletConnector()
        // const accounts = walletConnector.accounts
        // if (accounts && accounts.length) {
        //   cb(null, accounts)
        // } else {
        //   cb(new Error('Failed to get accounts'))
        // }
    }

    async send(payload: any, callback: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async enable(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async getWalletConnector(): Promise<WalletConnect> {
        const walletConnector = this.walletConnector;

        if (!walletConnector.connected) {
            try {
                await walletConnector.createSession();
                if (this.qrcode) {
                    // Use RxJS to convert to promise
                    WalletConnectQRCodeModal.open(walletConnector.uri, () => {
                        reject(new Error('User closed WalletConnect modal'))
                    })
                }
                // Use RxJS to convert to promise
                walletConnector.on('connect', () => {
                    if (this.qrcode) {
                        WalletConnectQRCodeModal.close()
                    }
                    resolve(walletConnector)
                })
            }
            catch (e) {
                throw e;
            }
            return
        }

        return walletConnector;
    }
    start: () => void;


}