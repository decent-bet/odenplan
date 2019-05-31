"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("@walletconnect/browser"));
const qrcode_modal_1 = __importDefault(require("@walletconnect/qrcode-modal"));
const util_1 = require("util");
const rxjs_1 = require("rxjs");
class WalletConnectImpl {
    constructor(options) {
        this.qrcode = typeof options.qrcode === 'undefined' || options.qrcode !== false;
        this.bridge = options.bridge || null;
        if (!this.bridge || typeof this.bridge !== 'string') {
            throw new Error('Missing or Invalid bridge field');
        }
        this.walletConnector = new browser_1.default({ bridge: this.bridge });
        this.walletConnector.off = () => { };
        this.isWalletConnect = true;
    }
    async processTransaction(txParams) {
        const walletConnector = await this.getWalletConnector();
        try {
            return await walletConnector.sendTransaction(txParams);
        }
        catch (error) {
            throw error;
        }
    }
    async processSignTransaction(txParams) {
        const walletConnector = await this.getWalletConnector();
        try {
            return await walletConnector.signTransaction(txParams);
        }
        catch (error) {
            throw error;
        }
    }
    async processMessage(msgParams) {
        const walletConnector = await this.getWalletConnector();
        try {
            return await walletConnector.signMessage(msgParams);
        }
        catch (error) {
            throw error;
        }
    }
    async processPersonalMessage(msgParams) {
        const walletConnector = await this.getWalletConnector();
        try {
            return await walletConnector.signPersonalMessage(msgParams);
        }
        catch (error) {
            throw error;
        }
    }
    async processTypedMessage(msgParams) {
        const walletConnector = await this.getWalletConnector();
        try {
            return await walletConnector.signTypedData(msgParams);
        }
        catch (error) {
            throw error;
        }
    }
    async getAccounts(cb) {
        const walletConnector = await this.getWalletConnector();
        const accounts = walletConnector.accounts;
        if (accounts && accounts.length) {
            cb(null, accounts);
        }
        else {
            cb(new Error('Failed to get accounts'));
        }
    }
    async send(payload, callback) {
        throw new Error('Method not implemented.');
    }
    async enable() {
        throw new Error('Method not implemented.');
    }
    async getWalletConnector() {
        const walletConnector = this.walletConnector;
        if (!walletConnector.connected) {
            try {
                await walletConnector.createSession();
                if (this.qrcode) {
                    const open = util_1.promisify(qrcode_modal_1.default.open);
                    try {
                        await open(walletConnector.uri);
                    }
                    catch (e) {
                        throw new Error('User closed WalletConnect modal');
                    }
                }
                const onConnect = rxjs_1.fromEvent(walletConnector, 'connect')
                    .toPromise();
                await onConnect;
                if (this.qrcode) {
                    qrcode_modal_1.default.close();
                    return walletConnector;
                }
            }
            catch (e) {
                throw e;
            }
            return;
        }
        return walletConnector;
    }
}
exports.WalletConnectImpl = WalletConnectImpl;
