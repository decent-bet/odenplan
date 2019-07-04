import { ProviderWallet, ProviderWalletOptions } from '../src/ProviderWallet';
import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
import WalletConnect from '@walletconnect/browser';
jest.mock('@decent-bet/webcrypto-keychain');

const address = '0xfda1f84468c6d0f985b21807cbd60bb3aa38843d';
const options: ProviderWalletOptions = {
    behaviorType: 'walletconnect',
    behaviorOptions: {
        walletconnect: new WalletConnect({
            bridge: "https://bridge.walletconnect.org"
        })
    }
}
beforeEach(() => {
    KeyHandler.mockClear();
    KeyStore.mockClear();
})
test('create odenplan instance', () => {
    let wallet = new ProviderWallet(options);
    expect(wallet).toBeDefined();
});

test('should set a passphrase', async () => {
    let wallet = new ProviderWallet(options);
    await wallet.configurePassphrase('q2w3e4r5t6y7');
    expect(wallet.keyHandler.writeSecureValue).toHaveBeenCalled();
});

test('should throw error if passphrase less than 10', async () => {
    let wallet = new ProviderWallet(options);
    await wallet.configurePassphrase('q1212a');
    expect(wallet.keyHandler.writeSecureValue).not.toHaveBeenCalled();
});

test('should create a Vechain Wallet and return public address', async () => {
    KeyHandler.mockImplementation(() => {
        return {
            getSecureValue: jest.fn().mockReturnValue('q2w3e4r5t6y7'),
            writeSecureValue: jest.fn().mockReturnValue(Promise.resolve()),
        };
    });

    let wallet = new ProviderWallet(options);
    const response = await wallet.createAccount('q2w3e4r5t6y7');
    expect(wallet.keyHandler.getSecureValue).toHaveBeenCalled();
    expect(wallet.keyHandler.writeSecureValue).toHaveBeenCalled();
    expect(response.publicAddress).toContain('0x');
});

test('should get an account private key', async () => {
    const address = '0x4B94d6E1ABa9c85e5a9cBc82856DC77d5b558E5d';
    KeyHandler.mockImplementation(() => {
        return {
            getSecureValue: jest.fn().mockReturnValue('q2w3e4r5t6y7'),
        };
    });
    let wallet = new ProviderWallet(options);
    const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
    expect(wallet.keyHandler.getSecureValue).toBeCalledTimes(2);
});

test('should emit a push event if call_request is executed', async () => {
    const address = '0x4B94d6E1ABa9c85e5a9cBc82856DC77d5b558E5d';
    KeyHandler.mockImplementation(() => {
        return {
            onSigningRequest: {
                emit: jest.fn().mockReturnValue(true),
            },
        };
    });
    let wallet = new ProviderWallet(options);
    wallet.onSigningRequest.on('SIGN_TX', () => {});
    wallet.handleCallRequests(null, {
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_signTransaction',
        params: [{
            from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
            to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
            data: "0x", // Required
            gasPrice: "0x02540be400", // Optional
            gasLimit: "0x9c40", // Optional
            value: "0x00", // Optional
            nonce: "0x0114" // Optional
        }]
    });

    expect(wallet.onSigningRequest.emit).toBeDefined();
});