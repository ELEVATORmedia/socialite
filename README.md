# french-press ☕️

Utility package to extract and insert social media usernames from urls.

-   [Purpose](#purpose)
-   [Basic Usage](#Basic-Usage)
-   [Advanced Usage](#Advanced-Usage)
-   [API](#API)
-   [Development](#Development)

## Purpose

This package is meant to be used as an additional utility package within ELEVATOR's ecosystem regarding
public-facing profiles. In specific, this package exposes two main utility functions: `plunge` and `unbrew`. These functions are responsible for extracting and inserting social media usernames from raw urls.

## Basic Usage

This packages offers a two-way set of functions `plunge` & `unbrew`

### Retrieving a username from a social media url

To "extract" a username from a social media url we do the following:

```js
import frenchPress from 'french-press';

const rawURL = 'https://www.twitter.com/myUser';

console.log(frenchPress.plunge(rawURL));
```

The above will output `myUser`;

### Building an absolute URL from a social media username and a `type`

To retrieve the absolute URL from a given username and `type` (e.g., facebook, instagram, twitter), we use the `unbrew` call:

```js
import frenchPress from 'french-press';

const rawUsername = 'myUser';
const type = 'facebook'; // is an enumeration of lowercase social media domains.

console.log(frenchPress.unbrew(rawUsername, type));
```

The above call will output `https://www.facebook.com/myUser`;

## Advanced Usage

It's important to note that the `plunge` call can be configured to use two different resolution plans in extracting a username from a url or raw string. The key difference here is configured through the `singleOperation` parameter via the function call. The following is a description of the differences between the two:

`plunge(username, singleOperation=false)` (default)

This algorithm will attempt to extract the username from a url by parsing out url-like properties in _stages_. Meaning, that the algorithm will begin by first doing its regular pre-flight checks (non-empty strings, valid domain etc.), and then proceeds as follows:

1. Replace all instances of `http://` or `https://` with `<`. The purpose of this character is serve as a marker for where a replacement happened. Given that the `<` character is not allowed in any urls, we can assume that no username will contain this character.
2. Replace all instances of `www.` with `<`.
3. Replace all instances of `{socialMediaSite}.com/` with `<`. here, `socialMediaSite` can be `facebook`, `instagram`, `twitter`, etc.
4. Using the `<` replaced string, split this array by this delimiter, filter out the empty slots and return the first member of this array. This is done to avoid potential duplicate inputs. Using this approach, only the first unique instance is returned.

`plunge(username, singleOperation=true)`

This algorithm will attempt to extract the username from a url by parsing out url-like properties in a _single replace operation_. Meaning, that we generate 1 regular expression using quantifiers such as `protocol`, `www.`, `socialmediasite` and replace all instances of this expression once. We then proceed as follows:

1. Using the `<` replaced string, split this array by this delimiter, filter out the empty slots and return the first member of this array. This is done to avoid potential duplicate inputs. Using this approach, only the first unique instance is returned.

## API

### `plunge(rawInput<string>, singleOperation<boolean>)`

Extracts a username from a raw input string.

Here, `singleOperation` defaults to `false`.

It is worth noting that this package intentionally uses cross-browser-friendly regexes in extracting a username. As of this writing, `negative look-behinds` are not supported by most legacy browsers. As such, logical equivalence is achieved by writing a longer regular expression.

Note that the `plunge()` call must make a few policy decisions about what to do in certain cases of user input

#### Plunge Policies

-   **User Input is empty**: Will output an empty string "".
-   **User Input includes spaces**: Will output string with spaces replaced by "" (empty string). For example, if the user input is `https: www. facebook.com/ my User`. The algorithm will output `myUser`.
-   **User Input has special characters in it**: In the event of special characters, only `@` symbols are removed from the user input. Usernames such as `@#myU$er` would result in `#myU$ser`.
-   **User Input has a url with the wrong domain in it**: In the event of a url from the wrong origin, an empty string will be returned. For example if the user input is `https://google.com/myUser`, `''` will be returned

### `unbrew(username<string>, type<string>)`

Returns the absolute URL based on the `username` and `type` property. Here, `type` is a enumeration of pre-defined values marked as follows: `['facebook', 'instagram', 'twitter', 'soundcloud', 'youtube']`. If the user input is empty or malformed, an empty string will be returned.

> In the event this documentation may be outdated, please refer to the ALL_SOCIAL_DOMAINS enumeration found in `src/enums.js`

It is important to note that `youtube` links are an exception in parsing strategy given that their website has several strategies for redirecting a user to a specified user's channel. In specific, they have the following url patterns:

```
youtube.com/myUser

youtube.com/c/channel_id

youtube.com/channel/channel_id

youtube.com/user/myUser    ->    This is a legacy url and may no longer be supported in the future.
```

Given the separate patterns, `french-press` interpolates the user input based on the characters included in the username. In specific, if the username begins with `UC` or `HC`, the string is interpreted as a channel id. Otherwise, the username is interpreted as custom channel name. As such, the following variant mapping is used:

```
customUsername => https://www.youtube.com/customUsername

UH1234234 => https://www.youtube.com/channel/UH1234234
```

### `isValidDomain(url<string>)`

Returns `true` if the specified domain is within the `ALL_SOCIAL_DOMAINS` enumeration found in `src/enums.js`. Otherwise were return `false`.

## Development

To begin development of this package please make sure you run the following in the root directory:

```
yarn && yarn dev
```

**NOTE:** This repository uses `husky` as part of its development process via `pre-commit` and `pre-push` hooks. If you try to push code that results in failing unit tests, the push will fail.

### Recommended Extensions

It is recommended to have the [mocha-sidebar](https://github.com/maty21/mocha-sidebar) extension for vs-code as it allows you to see tests passing in real-time

## Running Tests

To run tests on this project you can run the following yarn script:

```
yarn test
```
