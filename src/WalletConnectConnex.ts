import WalletConnect from '@walletconnect/browser'

export class WalletConnectConnex {
    walletConnector: WalletConnect;

    constructor(walletConnect: WalletConnect) {
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


    /**
     * eth_sendTransaction
     */
    private async sendTransaction() {

    }

    /**
     * eth_signTransaction
     */
    private async signTransaction() {

    }

    /**
     * eth_sign
     */
    private async signMessage() {

    }

    /**
     * personal_sign
     */
    private async signPersonalMessage() {

    }

}