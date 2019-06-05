/// <reference types="node" />
import WalletConnect from '@walletconnect/browser';
import { IJsonRpcRequest } from '@walletconnect/types';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import { EventEmitter } from 'events';
import { ConnexVendorWallet } from './ConnexVendorWallet';
export declare class ConnexWCVendorWallet extends ConnexVendorWallet implements IOdenplanConnexSigning {
    walletConnector: WalletConnect;
    constructor(walletConnect: WalletConnect);
    onSigningRequest: EventEmitter;
    handleCallRequests(error: any, payload: IJsonRpcRequest): Promise<void>;
    private sendTransaction;
    private signTransaction;
    private signMessage;
    private signPersonalMessage;
}
