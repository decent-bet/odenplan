/// <reference types="node" />
import { Wallet } from './wallet';
import { IOdenplanConnexSigning } from './IOdenplanConnexSigning';
import WalletConnect from '@walletconnect/browser';
import { EventEmitter } from 'events';
import { IJsonRpcRequest } from '@walletconnect/types';
export interface ProviderWalletOptions {
    behaviorType: 'server' | 'browser' | 'query' | 'walletconnect';
    behaviorOptions: {
        walletconnect?: WalletConnect;
        privateKey?: string;
    };
}
export declare class ProviderWallet extends Wallet implements IOdenplanConnexSigning {
    walletConnector: WalletConnect;
    onSigningRequest: EventEmitter;
    isReadOnly: boolean;
    privateKey: any;
    isServer: boolean;
    constructor(options: ProviderWalletOptions);
    getAccountKey(address: string, passphrase?: string): Promise<string>;
    configurePassphrase(passphrase: string): string;
    processSigningRequest(options: {
        address: string;
        signingAction: (pvk: any) => Promise<any>;
    }): Promise<any>;
    handleCallRequests(error: any, payload: IJsonRpcRequest): Promise<void>;
}
