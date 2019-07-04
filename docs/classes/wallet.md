[@decent-bet/odenplan](../README.md) > [Wallet](../classes/wallet.md)

# Class: Wallet

A simple VET wallet

## Hierarchy

**Wallet**

↳  [ProviderWallet](providerwallet.md)

## Implements

* [VendorWallet](../interfaces/vendorwallet.md)

## Index

### Constructors

* [constructor](wallet.md#constructor)

### Properties

* [askPassphraseValue](wallet.md#askpassphrasevalue)
* [keyHandler](wallet.md#keyhandler)
* [keyStore](wallet.md#keystore)
* [subscribeToAskPassphrase](wallet.md#subscribetoaskpassphrase)
* [subscribeToSigning](wallet.md#subscribetosigning)

### Methods

* [configurePassphrase](wallet.md#configurepassphrase)
* [createAccount](wallet.md#createaccount)
* [getAccountKey](wallet.md#getaccountkey)
* [getAccounts](wallet.md#getaccounts)
* [internalCreateAccount](wallet.md#internalcreateaccount)
* [registerAccount](wallet.md#registeraccount)
* [validatePassphrase](wallet.md#validatepassphrase)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Wallet**(): [Wallet](wallet.md)

*Defined in [wallet.ts:40](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L40)*

**Returns:** [Wallet](wallet.md)

___

## Properties

<a id="askpassphrasevalue"></a>

###  askPassphraseValue

**● askPassphraseValue**: *`string`*

*Defined in [wallet.ts:48](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L48)*

___
<a id="keyhandler"></a>

###  keyHandler

**● keyHandler**: *`KeyHandler`*

*Defined in [wallet.ts:40](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L40)*

___
<a id="keystore"></a>

###  keyStore

**● keyStore**: *`KeyStore`*

*Defined in [wallet.ts:39](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L39)*

___
<a id="subscribetoaskpassphrase"></a>

###  subscribeToAskPassphrase

**● subscribeToAskPassphrase**: *`function`*

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[subscribeToAskPassphrase](../interfaces/vendorwallet.md#subscribetoaskpassphrase)*

*Defined in [wallet.ts:53](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L53)*

Callback to set passphrase

#### Type declaration
▸(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="subscribetosigning"></a>

###  subscribeToSigning

**● subscribeToSigning**: *`function`*

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[subscribeToSigning](../interfaces/vendorwallet.md#subscribetosigning)*

*Defined in [wallet.ts:58](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L58)*

Callback to approve or reject signing

#### Type declaration
▸(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___

## Methods

<a id="configurepassphrase"></a>

###  configurePassphrase

▸ **configurePassphrase**(passphrase: *`string`*): `any`

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[configurePassphrase](../interfaces/vendorwallet.md#configurepassphrase)*

*Defined in [wallet.ts:71](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L71)*

Configures a passphrase to lock and unlock keys

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  A passphrase |

**Returns:** `any`

___
<a id="createaccount"></a>

###  createAccount

▸ **createAccount**(passphrase?: *`string`*, canReturnMnemonicValue?: *`boolean`*): `Promise`<`any`>

*Defined in [wallet.ts:163](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L163)*

Creates a new account

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` passphrase | `string` |  Passphrase |
| `Optional` canReturnMnemonicValue | `boolean` |  Returns mnemonic if set to true, defauls to false |

**Returns:** `Promise`<`any`>

___
<a id="getaccountkey"></a>

###  getAccountKey

▸ **getAccountKey**(address: *`string`*, passphrase?: *`string`*): `Promise`<`string`>

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[getAccountKey](../interfaces/vendorwallet.md#getaccountkey)*

*Defined in [wallet.ts:106](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L106)*

Used by tx and cert signer, obtains a private key given a passphrase, if not set, subscribeToAskPassphrase will be called

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  A public address |
| `Optional` passphrase | `string` |  Passphrase to unlock |

**Returns:** `Promise`<`string`>

___
<a id="getaccounts"></a>

###  getAccounts

▸ **getAccounts**(): `Promise`<`string`[]>

*Defined in [wallet.ts:116](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L116)*

Gets a list of all accounts registered

**Returns:** `Promise`<`string`[]>

___
<a id="internalcreateaccount"></a>

### `<Private>` internalCreateAccount

▸ **internalCreateAccount**(canReturnMnemonicValue?: *`boolean`*): `Promise`<`object` \| `object`>

*Defined in [wallet.ts:138](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L138)*

Create account and returns a public address

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` canReturnMnemonicValue | `boolean` |  Set to true if mnemonic should be in the result |

**Returns:** `Promise`<`object` \| `object`>

___
<a id="registeraccount"></a>

###  registerAccount

▸ **registerAccount**(address: *`string`*, privateKey: *`string`*, passphrase?: *`string`*): `Promise`<`any`>

*Defined in [wallet.ts:127](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L127)*

Writes a private key given a public address

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  public address |
| privateKey | `string` |  private key |
| `Optional` passphrase | `string` |

**Returns:** `Promise`<`any`>

___
<a id="validatepassphrase"></a>

###  validatePassphrase

▸ **validatePassphrase**(passphrase: *`string`*, promiseFn: *`Promise`<`any`>*): `Promise`<`any`>

*Defined in [wallet.ts:84](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L84)*

Asks for passphrase and if succesful, executes promise

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  \- |
| promiseFn | `Promise`<`any`> |   |

**Returns:** `Promise`<`any`>

___

