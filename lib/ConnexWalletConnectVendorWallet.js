"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./wallet");
class ConnexWalletConnectVendorWallet extends wallet_1.Wallet {
    constructor(walletConnectProvider) {
        super();
        this.walletConnectProvider = walletConnectProvider;
    }
    async processSigningRequest(options) {
        const { address, to, data } = options;
        return this.walletConnectProvider.processSignTransaction({
            from: address,
            to,
            data
        });
    }
}
exports.ConnexWalletConnectVendorWallet = ConnexWalletConnectVendorWallet;
