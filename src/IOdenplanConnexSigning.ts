/// <reference types="@vechain/connex" />

type SignTxOptions = {
    signer?: string
    gas?: number
    dependsOn?: string
    link?: string
    comment?: string
}

export interface IOdenplanConnexSigning {
    processSigningRequest(options: { 
        address: string,
        signingAction: (pvk: any) => Promise<any>,
    }): Promise<any>;
}