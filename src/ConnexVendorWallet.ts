import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';

export class ConnexVendorWallet
    extends Wallet
    implements IOdenplanConnexSigning {

    constructor() {
        super();
    }

    async processSigningRequest(options: { 
        address: string,
        signingAction: (pvk: any) => Promise<any>,
    }): Promise<any> {
        const passphrase = await this.subscribeToAskPassphrase();
        const privateKey = await this.getAccountKey(options.address, passphrase);
        const pvk = Buffer.from(privateKey.substring(2), 'hex');        

        return options.signingAction(pvk);
    }
}