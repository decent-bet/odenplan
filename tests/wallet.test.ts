import { Wallet } from '../src/wallet';
import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
jest.mock('@decent-bet/webcrypto-keychain');

beforeEach(() => {
    KeyHandler.mockClear();
    KeyStore.mockClear();
})
test('create odenplan instance', () => {
    let wallet = new Wallet();
    expect(wallet).toBeDefined();
});

test('should set a passphrase', async () => {
    let wallet = new Wallet();    
    await wallet.configurePassphrase('q2w3e4r5t6y7');
    expect(wallet.keyHandler.writeSecureValue).toHaveBeenCalled();
});

test('should throw error if passphrase less than 10', async () => {
    let wallet = new Wallet();
    await wallet.configurePassphrase('q1212a');
    expect(wallet.keyHandler.writeSecureValue).not.toHaveBeenCalled();
});

test('should create a Vechain Wallet and return public address', async () => {
    KeyHandler.mockImplementation(() => {
        return {
            readSecureValue: jest.fn().mockReturnValue('q2w3e4r5t6y7'),
            writeSecureValue: jest.fn().mockReturnValue(Promise.resolve()),
        };
    });

    let wallet = new Wallet();
    const response = await wallet.createAccount('q2w3e4r5t6y7');
    expect(wallet.keyHandler.readSecureValue).toHaveBeenCalled();
    expect(wallet.keyHandler.writeSecureValue).toHaveBeenCalled();
    expect(response.publicAddress).toContain('0x');
});

test('should get an account private key', async () => {
    const address = '0x4B94d6E1ABa9c85e5a9cBc82856DC77d5b558E5d';
    KeyHandler.mockImplementation(() => {
        return {
            readSecureValue: jest.fn().mockReturnValue('q2w3e4r5t6y7'),
        };
    });
    let wallet = new Wallet();
    const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
    expect(wallet.keyHandler.readSecureValue).toBeCalledTimes(2);
});