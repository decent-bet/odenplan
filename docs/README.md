
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
const wallet = new Wallet();    
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
let wallet = new Wallet();

// leave last parameter as null if used with an UI, used subscribeToAskPassphrase
const response = await wallet.getAccountKey(address, 'q2w3e4r5t6y7');
```

Documentation
-------------

[API Documentation](/docs/README.md)

## Index

### Classes

* [ReadOnlyWallet](classes/readonlywallet.md)
* [Wallet](classes/wallet.md)

### Interfaces

* [VendorWallet](interfaces/vendorwallet.md)

### Variables

* [VET_DERIVATION](#vet_derivation)

---

## Variables

<a id="vet_derivation"></a>

### `<Const>` VET_DERIVATION

**● VET_DERIVATION**: *"m/44&#x27;/818&#x27;/0&#x27;/0/0"* =  `m/44'/818'/0'/0/0`

*Defined in [wallet.ts:4](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L4)*

___

