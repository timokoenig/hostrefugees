---
layout: page
title: Getting Started
nav_order: 1
---

# Getting Started

Add the following variables to your _.env_ file:

```sh
CONTACT_NAME=xxx
CONTACT_ADDRESS=xxx
CONTACT_ADDRESS_CITY=xxx
CONTACT_ADDRESS_COUNTRY=xxx
CONTACT_EMAIL=xxx
CONTACT_WEBSITE=hostrefugees.eu

GOOGLE_MAP_KEY=xxx
GOOGLE_ANALYTICS_ID=xxx
GOOGLE_TRANSLATE_KEY=xxx

DATABASE_URL=postgresql://postgres:@127.0.0.1:5432/hostrefugees?sslmode=disable

EMAIL_ENABLE=true
EMAIL_NAME=xxx
EMAIL_EMAIL=xxx
SMTP_USERNAME=user
SMTP_PASSWORD=password
SMTP_HOST=smtp.your-email.com

AWS_S3_REGION=eu-central-1
AWS_S3_ACCESS_KEY=xxx
AWS_S3_ACCESS_SECRET=xxx

AWS_S3_BUCKET_DOCUMENT=xxx
AWS_S3_BUCKET_PLACE=xxx
AWS_S3_BUCKET_USER=xxx

SECRET_COOKIE_PASSWORD=complex_password_at_least_32_characters_long
NODE_ENV=development
```

Then run the following two commands to start your local server:

```sh
npm install
npm run dev
```

### Production Build

Make sure to set the **NODE_ENV** to `production` to secure the iron session.

### Iron Session

https://github.com/vvo/iron-session

### Prisma

// To migrate the schema file and generate the client
npx prisma migrate dev --skip-seed

// To generate the client
npx prisma generate

#### Seeding Development Database

After applying all migration, run the following command to seed the database once:

```sh
npx prisma db seed
```

### Securing Passwords

https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

### Google Maps

Sign up at Google to get an API Key for Maps.

### Google Translate API

The platform uses the Google Translate API to translate free text fields for places.

```sh
GOOGLE_TRANSLATE_KEY=xxx
```

### Snapshot Tests

We use [Jest Snapshot Testing](https://jestjs.io/docs/snapshot-testing) for our components.

To add a new snapshot test, follow [the instructions](https://jestjs.io/docs/snapshot-testing) or use [this example](./tests/components/external-link.test.tsx) and then run `npm run test` to automatically create the snapshot file.

To update an existing snapshot, adjust the test case and run `npm run snapshot-update`.

### Email Template

Every email uses a base [responsive template](https://github.com/leemunroe/responsive-html-email-template) that is located in `material/email-template.html`. Before we send an email, we need to inline the css styles with a tool like [htmlemail.io/inline](https://htmlemail.io/inline/).

Set environment variable `EMAIL_ENABLE=true` to enable the emailing.

### Docker Build

```sh
docker build -t hostrefugees .
docker run -p 3000:3000 hostrefugees
```

### AWS S3

S3 is used to store documents for user profile photos, user verification documents, and place photos.

If you set NODE_ENV to 'development' the platform will use a local cache implementation instead of the S3 buckets. You can find the stored files in the `hostrefugees` temp directory.
