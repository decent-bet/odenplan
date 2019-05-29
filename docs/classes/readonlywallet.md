[@decent-bet/odenplan](../README.md) > [ReadOnlyWallet](../classes/readonlywallet.md)

# Class: ReadOnlyWallet

A read only wallet used for Connex.

## Hierarchy

**ReadOnlyWallet**

## Implements

* [VendorWallet](../interfaces/vendorwallet.md)

## Index

### Properties

* [askPassphraseValue](readonlywallet.md#askpassphrasevalue)
* [subscribeToAskPassphrase](readonlywallet.md#subscribetoaskpassphrase)
* [subscribeToSigning](readonlywallet.md#subscribetosigning)

### Methods

* [configurePassphrase](readonlywallet.md#configurepassphrase)
* [getAccountKey](readonlywallet.md#getaccountkey)

---

## Properties

<a id="askpassphrasevalue"></a>

###  askPassphraseValue

**● askPassphraseValue**: *`string`*

*Defined in [wallet.ts:65](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L65)*

___
<a id="subscribetoaskpassphrase"></a>

###  subscribeToAskPassphrase

**● subscribeToAskPassphrase**: *`function`*

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[subscribeToAskPassphrase](../interfaces/vendorwallet.md#subscribetoaskpassphrase)*

*Defined in [wallet.ts:58](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L58)*

Callback to set passphrase

#### Type declaration
▸(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="subscribetosigning"></a>

###  subscribeToSigning

**● subscribeToSigning**: *`function`*

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[subscribeToSigning](../interfaces/vendorwallet.md#subscribetosigning)*

*Defined in [wallet.ts:63](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L63)*

Callback to approve or reject signing

#### Type declaration
▸(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___

## Methods

<a id="configurepassphrase"></a>

###  configurePassphrase

▸ **configurePassphrase**(passphrase: *`string`*): `string`

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[configurePassphrase](../interfaces/vendorwallet.md#configurepassphrase)*

*Defined in [wallet.ts:51](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L51)*

Configures a passphrase to lock and unlock keys

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  A passphrase |

**Returns:** `string`

___
<a id="getaccountkey"></a>

###  getAccountKey

▸ **getAccountKey**(address: *`string`*, passphrase?: *`string`*): `Promise`<`string`>

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[getAccountKey](../interfaces/vendorwallet.md#getaccountkey)*

*Defined in [wallet.ts:43](https://github.com/decent-bet/odenplan/blob/7c1275c/src/wallet.ts#L43)*

Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  A public address |
| `Optional` passphrase | `string` |  Passphrase to unlock |

**Returns:** `Promise`<`string`>

___

