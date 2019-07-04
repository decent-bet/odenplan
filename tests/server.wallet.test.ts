import { ProviderWallet, ProviderWalletOptions } from '../src/ProviderWallet';
import { KeyHandler, KeyStore } from '@decent-bet/webcrypto-keychain';
jest.mock('@decent-bet/webcrypto-keychain');

const address = '0xfda1f84468c6d0f985b21807cbd60bb3aa38843d';
const options: ProviderWalletOptions = {
    behaviorType: 'server',
    behaviorOptions: {
        privateKey: '0x64adbb3bd3b4c862479fd21d3a7555071e38c12c915b8b14ddd7ae4f1ba8e93c'
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
test('should get an account private key', async () => {
    let wallet = new ProviderWallet(options);
    const response = await wallet.getAccountKey(address);
    expect(response).toBe(options.behaviorOptions.privateKey);
});
