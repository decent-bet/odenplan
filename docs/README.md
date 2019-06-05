
odenplan
========

A VET Wallet library

Install
-------

`npm i -S @decent-bet/odenplan`

Usage
-----

### Configure wallet passphrase

```typescript
const wallet = new ProviderWallet();    
await wallet.configurePassphrase('q2w3e4r5t6y7');

```

Subscribe to ask passphrase
---------------------------

```typescript
wallet.subscribeToAskPassphrase = new Promise((resolve, reject) => {
    //  Display UI dialog and return passphrase
});
```

Create a wallet account
-----------------------

```typescript
// if passphrase not set, it will ask for passphrase using subscribeToAskPassphrase
const { publicAddress } = await wallet.createAccount();

// last parameter if set to true returns mnemonic
const { publicAddress, mnemonic } = await wallet.createAccount(null, true);
```

Registers a wallet account
--------------------------

```typescript
// if user owns a private key, use registerAccount to import wallet
await wallet.registerAccount(address, privateKey, passphrase);
```

Subscribe to ask passphrase
---------------------------

```typescript
wallet.subscribeToAskPassphrase = new Promise((resolve, reject) => {
    //  Display UI dialog and return passphrase
});
```

Get account key (used with connex)
----------------------------------

```typescript
let wallet = new ProviderWallet();

// leave last parameter as null if used with an UI, used subscribeToAskPassphrase
const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
```

Wallet behaviors
----------------

### Browser

Use browser behavior for web based DApps solutions. Odenplan will handle private key access through the use of a passphrase.

```typescript
const wallet = new ProviderWallet({
    behaviorType: 'browser',
});

await wallet.configurePassphrase('q1212a');
```

### Query

Similar to a browser behavior but does not enable signing. Useful when you only need query type applications.

```typescript
const wallet = new ProviderWallet({
    behaviorType: 'query',
});
```

### Server

For microservices use cases, obviates the need for a passphrase. Any implementation should secure the private key in either HSM or secure storage.

```typescript
const wallet = new ProviderWallet({
    behaviorType: 'server',
    behaviorOptions: {
        privateKey: '0x64adbb3bd3b4c862479fd21d3a7555071e38c12c915b8b14ddd7ae4f1ba8e93c'
    }
});
```

### WalletConnect

A WalletConnect behavior to be used in React Native DApps (or similar). Manages the Wallet role in WalletConnect.

```typescript
const wallet = new ProviderWallet({
    behaviorType: 'walletconnect',
    behaviorOptions: {
        walletconnect: new WalletConnect({
            bridge: "https://bridge.walletconnect.org"
        })
    }
});

// Subscribe to eth_signTransaction
wallet.onSigningRequest.on('SIGN_TX', (params: any[]) => {
    // ... sign tx code goes here
});

// Subscribe to eth_sendTransaction
wallet.onSigningRequest.on('SEND_TX', (params: any[]) => {
    // ... send tx code goes here
});
```

Documentation
-------------

[API Documentation](/docs/README.md)

## Index

### Classes

* [ProviderWallet](classes/providerwallet.md)
* [Wallet](classes/wallet.md)

### Interfaces

* [IOdenplanConnexSigning](interfaces/iodenplanconnexsigning.md)
* [ProviderWalletOptions](interfaces/providerwalletoptions.md)
* [VendorWallet](interfaces/vendorwallet.md)

### Type aliases

* [SignTxOptions](#signtxoptions)

### Variables

* [VET_DERIVATION](#vet_derivation)

---

## Type aliases

<a id="signtxoptions"></a>

###  SignTxOptions

**Ƭ SignTxOptions**: *`object`*

*Defined in [IOdenplanConnexSigning.ts:3](https://github.com/decent-bet/odenplan/blob/95a0049/src/IOdenplanConnexSigning.ts#L3)*

#### Type declaration

`Optional`  comment: `string`

`Optional`  dependsOn: `string`

`Optional`  gas: `number`

`Optional`  link: `string`

`Optional`  signer: `string`

___

## Variables

<a id="vet_derivation"></a>

### `<Const>` VET_DERIVATION

**● VET_DERIVATION**: *"m/44&#x27;/818&#x27;/0&#x27;/0/0"* =  `m/44'/818'/0'/0/0`

*Defined in [wallet.ts:4](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L4)*

___

