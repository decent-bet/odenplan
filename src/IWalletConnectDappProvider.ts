import WalletConnect from '@walletconnect/browser'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'
import { promisify } from 'util';
import { fromEvent } from 'rxjs';

export interface IWalletConnectDappProvider {
    processTransaction(txParams): Promise<WalletConnect>;
    processSignTransaction(txParams): Promise<WalletConnect>;
    processMessage(msgParams): Promise<WalletConnect>;
    processPersonalMessage(msgParams): Promise<WalletConnect>;
    processTypedMessage(msgParams): Promise<WalletConnect>;
    getAccounts(cb: () => {}): Promise<void>;
    send(payload, callback): Promise<any>;
    enable(): Promise<any>;
    getWalletConnector(): Promise<WalletConnect>;
    start: () => void;
}

export class WalletConnectImpl implements IWalletConnectDappProvider {
    qrcode: boolean;
    bridge: any;
    walletConnector: WalletConnect;
    isWalletConnect: boolean;

    constructor(options: any) {
        this.qrcode = typeof options.qrcode === 'undefined' || options.qrcode !== false;
        this.bridge = options.bridge || null;

        if (!this.bridge || typeof this.bridge !== 'string') {
            throw new Error('Missing or Invalid bridge field')
        }

        this.walletConnector = new WalletConnect({ bridge: this.bridge });
        (this.walletConnector as any).off = () => {};
        this.isWalletConnect = true;
    }

    async processTransaction(txParams: any): Promise<WalletConnect> {
        const walletConnector = await this.getWalletConnector()
        try {
            return await walletConnector.sendTransaction(txParams)
        } catch (error) {
            throw error;
        }
    }

    async processSignTransaction(txParams: any): Promise<WalletConnect> {
        const walletConnector = await this.getWalletConnector()
        try {
            return await walletConnector.signTransaction(txParams)
        } catch (error) {
            throw error;
        }
    }

    async processMessage(msgParams: any): Promise<WalletConnect> {
        const walletConnector = await this.getWalletConnector()
        try {
            return await walletConnector.signMessage(msgParams)
        } catch (error) {
            throw error;
        }
    }

    async processPersonalMessage(msgParams: any): Promise<WalletConnect> {
        const walletConnector = await this.getWalletConnector()
        try {
            return await walletConnector.signPersonalMessage(msgParams)
        } catch (error) {
            throw error;
        }
    }

    async processTypedMessage(msgParams: any): Promise<WalletConnect> {
        const walletConnector = await this.getWalletConnector()
        try {
            return await walletConnector.signTypedData(msgParams)
        } catch (error) {
            throw error;
        }
    }

    async getAccounts(cb): Promise<void> {
        const walletConnector = await this.getWalletConnector()
        const accounts = walletConnector.accounts
        if (accounts && accounts.length) {
          cb(null, accounts)
        } else {
          cb(new Error('Failed to get accounts'))
        }
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
                    const open = promisify(WalletConnectQRCodeModal.open);
                    try {
                    await open(walletConnector.uri);
                    }
                    catch (e) {
                        throw new Error('User closed WalletConnect modal');
                    }
                }
                // Use RxJS to convert to promise
                const onConnect = fromEvent((walletConnector as any), 'connect')
                .toPromise();
                await onConnect;
                if (this.qrcode) {
                    WalletConnectQRCodeModal.close()
                    return walletConnector;
                }
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