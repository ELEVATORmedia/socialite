# french-press ☕️

Utility package to extract and insert social media usernames from urls.

-   [Purpose](#purpose)
-   [Basic Usage](#Basic-Usage)
-   [API](#API)
-   [Development](#Development)

## Purpose

This package is meant to be used as an additional utility package within ELEVATOR's ecosystem regarding
public-facing profiles. In specific, this package exposes two main utility functions: `plunge` and `unbrew`. These functions are responsible for extracting and inserting social media usernames from raw urls. The API can be found below.

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

To retrieve the absolute URL from a given username and `type` (e.g., facebook, instagram, twitter), we use the `unbrew` call:

```js
import frenchPress from 'french-press';

const rawUsername = 'myUser';
const type = 'facebook'; // is an enumeration of lowercase social media domains.

console.log(frenchPress.unbrew(rawUsername, type));
```

The above call will output `https://www.facebook.com/myUser`;

## API

### `plunge(rawInput<string>)`

Extracts a username from a raw input string.

It is worth noting that this package intentionally uses cross-browser-friendly regexes in extracting a username. As of this writing, `negative look-behinds` are not supported by most legacy browsers. As such, logical equivalence is achieved by writing a longer regular expression.

Note that the `plunge()` call must make a few policy decisions about what to do in certain cases of user input

#### Plunge Policies

-   **User Input is empty**: Will output an empty string "".
-   **User Input includes spaces**: Will output string with spaces replaced by "" (empty string). For example, if the user input is `https: www. facebook.com/ my User`. The algorithm will output `myUser`.
-   **User Input has special characters in it**: In the event of special characters, only `@` symbols are removed from the user input. Usernames such as `@#myU$er` would result in `#myU$ser`.
-   **User Input has a url with the wrong domain in it**: In the event of a url from the wrong origin, an empty string will be returned. For example if the user input is `https://google.com/myUser`, `''` will be returned

### `unbrew(username<string>, type<string>)`

Returns the absolute URL based on the `username` and `type` property. Here, `type` is a enumeration of pre-defined values marked as follows: `['facebook', 'instagram', 'twitter', 'soundcloud', 'youtube']`. If the user input is empty or malformed, an empty string will be returned.

It is important to note that `youtube` links are an exception in parsing strategy given that their website has several strategies for redirecting a user to a specified user's channel. In specific, they have the following url patterns:

```
youtube.com/myUser

youtube.com/c/channel_id

youtube.com/channel/channel_id

youtube.com/user/myUser    ->    This is a legacy url and may no longer be supported in the future.
```

Given the separate patterns, `french-press` interpolates the user input based on the characters included in the username. In specific, if the username begins with `UC` or `UH`, the string is interpreted as a channel id. Otherwise, the username is interpreted as custom channel name. As such, the following variant mapping is used:

```
customUsername => https://www.youtube.com/customUsername

UH1234234 => https://www.youtube.com/c/UH1234234
```

## Development

To begin development of this package please make sure you run the following in the root directory:

```
yarn && yarn dev
```

### Recommended Extensions

It is recommended to have the [mocha-sidebar](https://github.com/maty21/mocha-sidebar) extension for vs-code as it allows you to see tests passing in real-time

## Running Tests

To run tests on this project you can run the following yarn script:

```
yarn test
```
