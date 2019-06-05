import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import { IWalletConnectDappProvider } from './IWalletConnectDappProvider';
export declare class ConnexWalletConnectVendorWallet extends Wallet implements IOdenplanConnexSigning {
    private walletConnectProvider;
    constructor(walletConnectProvider: IWalletConnectDappProvider);
    processSigningRequest(options: {
        address: string;
        to?: string;
        data?: string;
        signingAction: (pvk: any) => Promise<any>;
    }): Promise<any>;
}
