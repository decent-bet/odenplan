export interface IOdenplanConnexSigning {
    processSigningRequest(options: {
        address: string;
        signingAction: (pvk: any) => Promise<any>;
    }): Promise<any>;
}
