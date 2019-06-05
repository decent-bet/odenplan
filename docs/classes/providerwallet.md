[@decent-bet/odenplan](../README.md) > [ProviderWallet](../classes/providerwallet.md)

# Class: ProviderWallet

Provider Wallet

## Hierarchy

 [Wallet](wallet.md)

**↳ ProviderWallet**

## Implements

* [VendorWallet](../interfaces/vendorwallet.md)
* [IOdenplanConnexSigning](../interfaces/iodenplanconnexsigning.md)

## Index

### Constructors

* [constructor](providerwallet.md#constructor)

### Properties

* [askPassphraseValue](providerwallet.md#askpassphrasevalue)
* [isReadOnly](providerwallet.md#isreadonly)
* [isServer](providerwallet.md#isserver)
* [keyHandler](providerwallet.md#keyhandler)
* [keyStore](providerwallet.md#keystore)
* [onSigningRequest](providerwallet.md#onsigningrequest)
* [privateKey](providerwallet.md#privatekey)
* [subscribeToAskPassphrase](providerwallet.md#subscribetoaskpassphrase)
* [subscribeToSigning](providerwallet.md#subscribetosigning)
* [walletConnector](providerwallet.md#walletconnector)

### Methods

* [configurePassphrase](providerwallet.md#configurepassphrase)
* [createAccount](providerwallet.md#createaccount)
* [getAccountKey](providerwallet.md#getaccountkey)
* [getAccounts](providerwallet.md#getaccounts)
* [handleCallRequests](providerwallet.md#handlecallrequests)
* [processSigningRequest](providerwallet.md#processsigningrequest)
* [registerAccount](providerwallet.md#registeraccount)
* [validatePassphrase](providerwallet.md#validatepassphrase)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProviderWallet**(options: *[ProviderWalletOptions](../interfaces/providerwalletoptions.md)*): [ProviderWallet](providerwallet.md)

*Overrides [Wallet](wallet.md).[constructor](wallet.md#constructor)*

*Defined in [ProviderWallet.ts:23](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ProviderWalletOptions](../interfaces/providerwalletoptions.md) |

**Returns:** [ProviderWallet](providerwallet.md)

___

## Properties

<a id="askpassphrasevalue"></a>

###  askPassphraseValue

**● askPassphraseValue**: *`string`*

*Inherited from [Wallet](wallet.md).[askPassphraseValue](wallet.md#askpassphrasevalue)*

*Defined in [wallet.ts:48](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L48)*

___
<a id="isreadonly"></a>

###  isReadOnly

**● isReadOnly**: *`boolean`*

*Defined in [ProviderWallet.ts:21](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L21)*

___
<a id="isserver"></a>

###  isServer

**● isServer**: *`boolean`*

*Defined in [ProviderWallet.ts:23](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L23)*

___
<a id="keyhandler"></a>

###  keyHandler

**● keyHandler**: *`KeyHandler`*

*Inherited from [Wallet](wallet.md).[keyHandler](wallet.md#keyhandler)*

*Defined in [wallet.ts:40](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L40)*

___
<a id="keystore"></a>

###  keyStore

**● keyStore**: *`KeyStore`*

*Inherited from [Wallet](wallet.md).[keyStore](wallet.md#keystore)*

*Defined in [wallet.ts:39](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L39)*

___
<a id="onsigningrequest"></a>

###  onSigningRequest

**● onSigningRequest**: *`EventEmitter`*

*Defined in [ProviderWallet.ts:20](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L20)*

___
<a id="privatekey"></a>

###  privateKey

**● privateKey**: *`any`*

*Defined in [ProviderWallet.ts:22](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L22)*

___
<a id="subscribetoaskpassphrase"></a>

###  subscribeToAskPassphrase

**● subscribeToAskPassphrase**: *`function`*

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[subscribeToAskPassphrase](../interfaces/vendorwallet.md#subscribetoaskpassphrase)*

*Inherited from [Wallet](wallet.md).[subscribeToAskPassphrase](wallet.md#subscribetoaskpassphrase)*

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

*Inherited from [Wallet](wallet.md).[subscribeToSigning](wallet.md#subscribetosigning)*

*Defined in [wallet.ts:58](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L58)*

Callback to approve or reject signing

#### Type declaration
▸(): `Promise`<`string`>

**Returns:** `Promise`<`string`>

___
<a id="walletconnector"></a>

###  walletConnector

**● walletConnector**: *`WalletConnect`*

*Defined in [ProviderWallet.ts:19](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L19)*

___

## Methods

<a id="configurepassphrase"></a>

###  configurePassphrase

▸ **configurePassphrase**(passphrase: *`string`*): `string`

*Implementation of [VendorWallet](../interfaces/vendorwallet.md).[configurePassphrase](../interfaces/vendorwallet.md#configurepassphrase)*

*Overrides [Wallet](wallet.md).[configurePassphrase](wallet.md#configurepassphrase)*

*Defined in [ProviderWallet.ts:59](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L59)*

Configures a passphrase to lock and unlock keys

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  A passphrase |

**Returns:** `string`

___
<a id="createaccount"></a>

###  createAccount

▸ **createAccount**(passphrase?: *`string`*, canReturnMnemonicValue?: *`boolean`*): `Promise`<`any`>

*Inherited from [Wallet](wallet.md).[createAccount](wallet.md#createaccount)*

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

*Overrides [Wallet](wallet.md).[getAccountKey](wallet.md#getaccountkey)*

*Defined in [ProviderWallet.ts:45](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L45)*

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

*Inherited from [Wallet](wallet.md).[getAccounts](wallet.md#getaccounts)*

*Defined in [wallet.ts:116](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L116)*

Gets a list of all accounts registered

**Returns:** `Promise`<`string`[]>

___
<a id="handlecallrequests"></a>

###  handleCallRequests

▸ **handleCallRequests**(error: *`any`*, payload: *`IJsonRpcRequest`*): `Promise`<`void`>

*Defined in [ProviderWallet.ts:88](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L88)*

Push signing scenarios

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| error | `any` |  \- |
| payload | `IJsonRpcRequest` |   |

**Returns:** `Promise`<`void`>

___
<a id="processsigningrequest"></a>

###  processSigningRequest

▸ **processSigningRequest**(options: *`object`*): `Promise`<`any`>

*Defined in [ProviderWallet.ts:72](https://github.com/decent-bet/odenplan/blob/95a0049/src/ProviderWallet.ts#L72)*

Pull signing scenarios

**Parameters:**

**options: `object`**

| Name | Type |
| ------ | ------ |
| address | `string` |
| signingAction | `function` |

**Returns:** `Promise`<`any`>

___
<a id="registeraccount"></a>

###  registerAccount

▸ **registerAccount**(address: *`string`*, privateKey: *`string`*, passphrase?: *`string`*): `Promise`<`any`>

*Inherited from [Wallet](wallet.md).[registerAccount](wallet.md#registeraccount)*

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

*Inherited from [Wallet](wallet.md).[validatePassphrase](wallet.md#validatepassphrase)*

*Defined in [wallet.ts:84](https://github.com/decent-bet/odenplan/blob/95a0049/src/wallet.ts#L84)*

Asks for passphrase and if succesful, executes promise

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| passphrase | `string` |  \- |
| promiseFn | `Promise`<`any`> |   |

**Returns:** `Promise`<`any`>

___

