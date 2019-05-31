"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./wallet");
class ConnexVendorWallet extends wallet_1.Wallet {
    constructor() {
        super();
    }
    async processSigningRequest(options) {
        const passphrase = await this.subscribeToAskPassphrase();
        const privateKey = await this.getAccountKey(options.address, passphrase);
        const pvk = Buffer.from(privateKey.substring(2), 'hex');
        return options.signingAction(pvk);
    }
}
exports.ConnexVendorWallet = ConnexVendorWallet;
