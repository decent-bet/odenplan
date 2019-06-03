# odenplan
A VET  Wallet library

## Install

`npm i -S @decent-bet/odenplan`


## Usage

### Configure wallet passphrase

```typescript
const wallet = new ConnexVendorWallet();    
await wallet.configurePassphrase('q2w3e4r5t6y7');

```

## Subscribe to ask passphrase

```typescript
wallet.subscribeToAskPassphrase = new Promise((resolve, reject) => {
    //  Display UI dialog and return passphrase
});
```

## Create a wallet account

```typescript
// if passphrase not set, it will ask for passphrase using subscribeToAskPassphrase
const { publicAddress } = await wallet.createAccount();

// last parameter if set to true returns mnemonic
const { publicAddress, mnemonic } = await wallet.createAccount(null, true);
```


## Registers a wallet account

```typescript
// if user owns a private key, use registerAccount to import wallet
await wallet.registerAccount(address, privateKey, passphrase);
```

## Subscribe to ask passphrase

```typescript
wallet.subscribeToAskPassphrase = new Promise((resolve, reject) => {
    //  Display UI dialog and return passphrase
});
```

## Get account key (used with connex)

```typescript
let wallet = new ConnexVendorWallet();

// leave last parameter as null if used with an UI, used subscribeToAskPassphrase
const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
```


## Wallet implementations

* `ConnexVendorWallet`: Support for Connex (pull signing / client requested).
* `ConnexWCVendorWallet`: Support for Connex for React Native (push signing / WalletConnect requested).
* `ReadOnlyWallet`: Support for non signing use cases.

> Note: Subscribe to `wallet.onSigningRequested` when using `ConnexWCVendorWallet`.

## Documentation

[API Documentation](/docs/README.md)