![GitHub](https://img.shields.io/github/license/elevatormedia/socialite)
![npm](https://img.shields.io/npm/v/@elevatormedia/socialite)
![npm](https://img.shields.io/npm/dt/@elevatormedia/socialite)
![GitHub issues](https://img.shields.io/github/issues-raw/elevatormedia/socialite)

<h1 align="center" >🎭 socialite 🎭 </h1>

Utility package to extract social media usernames from urls and create urls from usernames.

## Basic Usage

This package offers a two-way set of functions `extractUser` & `buildUrl`

### extractUser

To extract a username from a social media url we do the following:

```js
import socialite from 'socialite';

const rawURL = 'https://www.twitter.com/myUser';

console.log(socialite.extractUser(rawURL));
```

The above will output `myUser`;

### buildUrl

To retrieve the absolute URL from a given username and `type` (e.g., facebook, instagram, twitter), we use the `buildUrl` call:

```js
import socialite from 'socialite';

const rawUsername = 'myUser';
const type = 'facebook';

console.log(socialite.buildUrl(rawUsername, type));
```

The above call will output `https://www.facebook.com/myUser`;

## Full Documentation & Contributing

⚠️ Please see the repo's [wiki](https://github.com/ELEVATORmedia/socialite/wiki) for the full documentation on running and contributing to this project ⚠️
