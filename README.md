![npm version](https://img.shields.io/npm/v/@elevatormedia/socialite)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ELEVATORmedia/socialite/Update%20Release%20CI?label=latest%20release)
![GitHub](https://img.shields.io/github/license/elevatormedia/socialite)
![npm downloads](https://img.shields.io/npm/dt/@elevatormedia/socialite)
![npm bundle size](https://img.shields.io/bundlephobia/min/@elevatormedia/socialite)
![GitHub issues](https://img.shields.io/github/issues-raw/elevatormedia/socialite)

<h1 align="center" >🎭 socialite 🎭 </h1>

Utility package to extract social media usernames from urls and create urls from usernames.

## Installation

NPM:

```sh
npm i @elevatormedia/socialite
```

Yarn:

```sh
yarn add @elevatormedia/socialite
```

## Basic Usage

This package offers three functions `extractUser`, `buildUrl`, & `isValidUrl`

### extractUser

To extract a username from a social media url:

```js
import { extractUser } from '@elevatormedia/socialite';

const rawURL = 'https://www.twitter.com/myUser';

console.log(extractUser(rawURL));
```

The above will output `myUser`;

### buildUrl

To retrieve the absolute URL from a given username and `type` (e.g., facebook, instagram, twitter):

```js
import { buildUrl } from '@elevatormedia/socialite';

const rawUsername = 'myUser';
const type = 'facebook';

console.log(buildUrl(rawUsername, type));
```

The above call will output `https://www.facebook.com/myUser`;

### isValidDomain

To check if a given url is a valid case of a supported social type:

```js
import { isValidDomain } from '@elevatormedia/socialite';

const url = 'https://www.soundcloud.com/myUser';

console.log(isValidDomain(url));
```

The above call will output `true`;

## Full Documentation & Contributing

⚠️ Please see the repo's [wiki](https://github.com/ELEVATORmedia/socialite/wiki) for the full documentation on running and contributing to this project ⚠️
