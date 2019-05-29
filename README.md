# odenplan
A VET  Wallet library

## Install

`npm i -S @decent-bet/odenplan`


## Usage

### Configure wallet passphrase

```typescript
const wallet = new Wallet();    
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
let wallet = new Wallet();

// leave last parameter as null if used with an UI, used subscribeToAskPassphrase
const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
```

## Documentation

[API Documentation](/docs/README.md)