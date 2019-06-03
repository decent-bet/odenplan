"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WalletConnectConnex {
    constructor(walletConnect) {
        this.walletConnector = walletConnect;
        this.walletConnector.on('call_request', this.handleCallRequests);
    }
    async handleCallRequests(error, payload) {
        console.log(`WalletConnectConnex ${payload.displayRequest.method}`);
        switch (payload.displayRequest.method) {
            case 'eth_sendTransaction':
                console.log(payload.displayRequest);
                break;
            case 'eth_signTransaction':
                console.log(payload.displayRequest);
                break;
            case 'eth_sign':
                console.log(payload.displayRequest);
                break;
            case 'personal_sign':
                console.log(payload.displayRequest);
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
exports.WalletConnectConnex = WalletConnectConnex;
