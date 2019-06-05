"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnexVendorWallet_1 = require("./ConnexVendorWallet");
class ConnexWCVendorWallet extends ConnexVendorWallet_1.ConnexVendorWallet {
    constructor(walletConnect) {
        super();
        this.walletConnector = walletConnect;
        this.walletConnector.on('call_request', this.handleCallRequests);
    }
    async handleCallRequests(error, payload) {
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
    async sendTransaction() {
    }
    async signTransaction() {
    }
    async signMessage() {
    }
    async signPersonalMessage() {
    }
}
exports.ConnexWCVendorWallet = ConnexWCVendorWallet;
