import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import { IWalletConnectDappProvider } from './IWalletConnectDappProvider';

export class ConnexWalletConnectVendorWallet
    extends Wallet
    implements IOdenplanConnexSigning {

    constructor(private walletConnectProvider: IWalletConnectDappProvider) {
        super();
    }
    async processSigningRequest(options: { 
        address: string,
        to?: string,
        data?: string,
        signingAction: (pvk: any) => Promise<any>,
    }): Promise<any> {

        const { address, to, data } = options;
        // Will display UI and return wallet connect
        return this.walletConnectProvider.processSignTransaction({
            from: address,
            to,
            data
        });
    }
}