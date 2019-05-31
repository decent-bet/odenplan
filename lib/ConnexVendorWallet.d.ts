import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
export declare class ConnexVendorWallet extends Wallet implements IOdenplanConnexSigning {
    constructor();
    processSigningRequest(options: {
        address: string;
        signingAction: (pvk: any) => Promise<any>;
    }): Promise<any>;
}
