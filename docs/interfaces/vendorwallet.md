[@decent-bet/odenplan](../README.md) > [VendorWallet](../interfaces/vendorwallet.md)

# Interface: VendorWallet

VendorWallet is an interface to integrate with Connex

## Hierarchy

**VendorWallet**

## Implemented by

* [ProviderWallet](../classes/providerwallet.md)
* [Wallet](../classes/wallet.md)

## Index

### Properties

* [subscribeToAskPassphrase](vendorwallet.md#subscribetoaskpassphrase)
* [subscribeToSigning](vendorwallet.md#subscribetosigning)

### Methods

* [configurePassphrase](vendorwallet.md#configurepassphrase)
* [getAccountKey](vendorwallet.md#getaccountkey)

---

## Properties

<a id="subscribetoaskpassphrase"></a>

###  subscribeToAskPassphrase

**● subscribeToAskPassphrase**: *`function`*

*Defined in [wallet.ts:26](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L26)*

Callback to set passphrase

#### Type declaration
▸(): `Promise`<`any`>

**Returns:** `Promise`<`any`>

___
<a id="subscribetosigning"></a>

###  subscribeToSigning

**● subscribeToSigning**: *`function`*

*Defined in [wallet.ts:31](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L31)*

Callback to approve or reject signing

#### Type declaration
▸(): `Promise`<`any`>

**Returns:** `Promise`<`any`>

___

## Methods

<a id="configurepassphrase"></a>

###  configurePassphrase

▸ **configurePassphrase**(passphrase: *`string`*): `void`

*Defined in [wallet.ts:21](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L21)*

Configures a passphrase to lock and unlock keys

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  A passphrase |

**Returns:** `void`

___
<a id="getaccountkey"></a>

###  getAccountKey

▸ **getAccountKey**(address: *`string`*, passphrase?: *`string`*): `Promise`<`string`>

*Defined in [wallet.ts:15](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L15)*

Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  A public address |
| `Optional` passphrase | `string` |  Passphrase to unlock |

**Returns:** `Promise`<`string`>

___

