<div align="center">
   <h1>HostRefugees.eu</h1>
</div>

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/timokoenig/hostrefugees/Build%20and%20run%20unit%20tests) [![GitHub issues](https://img.shields.io/github/issues/timokoenig/hostrefugees)](https://github.com/timokoenig/hostrefugees/issues) ![GitHub last commit](https://img.shields.io/github/last-commit/timokoenig/hostrefugees) ![Website](https://img.shields.io/website?down_message=offline&label=webapp&up_message=online&url=https%3A%2F%2Fhostrefugees.eu)

</div>

Want to join or help out? Send me a message on Twitter [@timokoenig](https://twitter.com/timokoenig)

## Getting Started

Add the following variables to your _.env_ file:

```sh
NEXT_PUBLIC_CONTACT_NAME=xxx
NEXT_PUBLIC_CONTACT_ADDRESS=xxx
NEXT_PUBLIC_CONTACT_ADDRESS_CITY=xxx
NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=xxx
NEXT_PUBLIC_CONTACT_WEBSITE=hostrefugees.eu
NEXT_PUBLIC_VERSION=0.0.1
```

Then run the following two commands to start your local server:

```sh
npm install
npm run dev
```

## Snapshot Tests

We use [Jest Snapshot Testing](https://jestjs.io/docs/snapshot-testing) for our components.

To add a new snapshot test, follow [the instructions](https://jestjs.io/docs/snapshot-testing) or use [this example](./tests/components/external-link.test.tsx) and then run `npm run test` to automatically create the snapshot file.

To update an existing snapshot, adjust the test case and run `npm run snapshot-update`.

## i18n

The app uses [i18next](https://www.i18next.com/) for internationalization. We want to offer this website to as many people as possible therefore native translations are important. We welcome anyone to help us translate this app. To do so, follow these steps:

1. If the language does not exist, create a folder in _/translations_ and copy the files _/translations/en/common.json_ and _/translations/en/country.json_ in that folder
2. Translate the existing values in those files and make sure you do not change the key
3. Save and commit your changes

Note: If you do not add a translation in any given language, the app will default to English.

---

<p align="center">Made with <span style="color: red">♥</span> for the people</p>
