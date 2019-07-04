"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./wallet");
const events_1 = require("events");
class ProviderWallet extends wallet_1.Wallet {
    constructor(options) {
        super();
        if (options.behaviorType === 'walletconnect') {
            this.walletConnector = options.behaviorOptions.walletconnect;
            this.walletConnector.on('call_request', this.handleCallRequests.bind(this));
            this.onSigningRequest = new events_1.EventEmitter();
        }
        else if (options.behaviorType === 'query') {
            this.isReadOnly = true;
        }
        else if (options.behaviorType === 'server') {
            this.isServer = true;
            this.privateKey = options.behaviorOptions.privateKey;
        }
    }
    getAccountKey(address, passphrase) {
        if (this.isReadOnly) {
            throw new Error('This is a read only wallet, cannot get key to sign transactions');
        }
        else if (this.isServer) {
            return Promise.resolve(this.privateKey);
        }
        return super.getAccountKey(address, passphrase);
    }
    configurePassphrase(passphrase) {
        if (this.isReadOnly) {
            return passphrase;
        }
        else if (this.isServer) {
            return 'no_passphrase_required_for_server_wallet';
        }
        super.configurePassphrase(passphrase);
    }
    async processSigningRequest(options) {
        let passphrase = '';
        if (this.subscribeToAskPassphrase) {
            passphrase = await this.subscribeToAskPassphrase();
        }
        else if (!this.isServer) {
            throw new Error('Missing subscribeToAskPassphrase');
        }
        const privateKey = await this.getAccountKey(options.address, passphrase);
        const pvk = Buffer.from(privateKey.substring(2), 'hex');
        return options.signingAction(pvk);
    }
    async handleCallRequests(error, payload) {
        if (!this.walletConnector) {
            throw new Error('No WalletConnect has been loaded.');
        }
        console.log(`WalletConnectConnex ${payload.method}`);
        switch (payload.method) {
            case 'eth_sendTransaction':
                if (this.onSigningRequest) {
                    console.log(payload.params);
                    this.onSigningRequest.emit('SEND_TX', payload.params);
                }
                break;
            case 'eth_signTransaction':
                if (this.onSigningRequest) {
                    console.log(payload.params);
                    this.onSigningRequest.emit('SIGN_TX', payload.params);
                }
                break;
            case 'eth_sign':
                console.log(payload.params);
                break;
            case 'personal_sign':
                console.log(payload.params);
                break;
        }
    }
}
exports.ProviderWallet = ProviderWallet;
