import WalletConnect from '@walletconnect/browser'
import { ITxData, IJsonRpcRequest } from '@walletconnect/types';
import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import { EventEmitter } from 'events';
import { ConnexVendorWallet } from './ConnexVendorWallet';

export class ConnexWCVendorWallet extends ConnexVendorWallet
    implements IOdenplanConnexSigning {

    walletConnector: WalletConnect;

    constructor(walletConnect: WalletConnect) {
        super();
        this.walletConnector = walletConnect;
        this.walletConnector.on('call_request', this.handleCallRequests);
    }

    onSigningRequest: EventEmitter;

    async handleCallRequests(error, payload: IJsonRpcRequest) {
        console.log(`WalletConnectConnex ${payload.method}`);
        switch (payload.method) {
            case 'eth_sendTransaction':
                //                 // Draft transaction
                // const tx = {
                //     from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
                //     to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
                //     data: "0x", // Required
                //     gasPrice: "0x02540be400", // Optional
                //     gasLimit: "0x9c40", // Optional
                //     value: "0x00", // Optional
                //     nonce: "0x0114" // Optional
                //   };

                // call 
                if (this.onSigningRequest) {
                    console.log(payload.params);
                    this.onSigningRequest.emit('SEND_TX', payload.params);
                }
                break;
            case 'eth_signTransaction':
                // Draft transaction
                // const tx = {
                //     from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
                //     to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
                //     data: "0x", // Required
                //     gasPrice: "0x02540be400", // Optional
                //     gasLimit: "0x9c40", // Optional
                //     value: "0x00", // Optional
                //     nonce: "0x0114" // Optional
                //   };
                // call 
                if (this.onSigningRequest) {
                    console.log(payload.params);
                    this.onSigningRequest.emit('SIGN_TX', payload.params);
                }
                break;
            case 'eth_sign':
                //                 // Draft Message Parameters
                // const message = "My email is john@doe.com - 1537836206101";

                // const msgParams = [
                //   "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",                            // Required
                //   keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))    // Required
                // ];
                console.log(payload.params);
                break;
            case 'personal_sign':
                // // Draft Message Parameters
                // const message = "My email is john@doe.com - 1537836206101"

                // const msgParams = [
                //   convertUtf8ToHex(message)                                                 // Required
                //   "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",                             // Required
                // ];

                console.log(payload.params);
                break;
        }
    }


    /**
     * eth_sendTransaction
     */
    private async sendTransaction() {

    }

    /**
     * eth_signTransaction
     */
    private async signTransaction() {

    }

    /**
     * eth_sign
     */
    private async signMessage() {

    }

    /**
     * personal_sign
     */
    private async signPersonalMessage() {

    }

}