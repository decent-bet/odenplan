import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import WalletConnect from '@walletconnect/browser';
import { EventEmitter } from 'events';
import { IJsonRpcRequest } from '@walletconnect/types';

export interface ProviderWalletOptions {
    behaviorType: 'server' | 'browser' | 'query' | 'walletconnect',
    behaviorOptions?: { walletconnect?: WalletConnect, privateKey?: string };
}

/**
 * Provider Wallet
 */
export class ProviderWallet
    extends Wallet
    implements IOdenplanConnexSigning {

    walletConnector: WalletConnect
    onSigningRequest: EventEmitter;
    isReadOnly: boolean;
    privateKey: any;
    isServer: boolean;

    constructor(options: ProviderWalletOptions) {
        super();

        if (options.behaviorType === 'walletconnect') {
            this.walletConnector = options.behaviorOptions.walletconnect;
            this.walletConnector.on('call_request', this.handleCallRequests.bind(this));
            this.onSigningRequest = new EventEmitter();
        } else if (options.behaviorType === 'query') {
            this.isReadOnly = true;
        } else if (options.behaviorType === 'server') {
            this.isServer = true;
            this.privateKey = options.behaviorOptions.privateKey;
        }
    }

    /**
     * Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called
     * @param address A public address
     * @param passphrase Passphrase to unlock
     */
    getAccountKey(address: string, passphrase?: string): Promise<string> {
        if (this.isReadOnly) {
            throw new Error('This is a read only wallet, cannot get key to sign transactions');
        } else if (this.isServer) {
            return Promise.resolve(this.privateKey);
        }
        return super.getAccountKey(address, passphrase);
    }


    /**
     * Configures a passphrase to lock and unlock keys
     * @param p     assphrase A passphrase
     */
    configurePassphrase(passphrase: string) {
        if (this.isReadOnly) {
            return passphrase;
        } else if (this.isServer) {
            return 'no_passphrase_required_for_server_wallet'
        }
        super.configurePassphrase(passphrase);
    }

    /**
     * Pull signing scenarios
     * @param options 
     */
    async processSigningRequest(options: {
        address: string,
        signingAction: (pvk: any) => Promise<any>,
    }): Promise<any> {
        let passphrase = '';
        if (this.subscribeToAskPassphrase) {
            passphrase = await this.subscribeToAskPassphrase();
        } else if (!this.isServer) {
            throw new Error('Missing subscribeToAskPassphrase')
        }
        const privateKey = await this.getAccountKey(options.address, passphrase);
        const pvk = Buffer.from(privateKey.substring(2), 'hex');

        return options.signingAction(pvk);
    }

    /**
     * Push signing scenarios
     * @param error 
     * @param payload 
     */
    async handleCallRequests(error, payload: IJsonRpcRequest) {
        if (!this.walletConnector) {
            throw new Error('No WalletConnect has been loaded.')
        }
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
}