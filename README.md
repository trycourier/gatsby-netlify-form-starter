# Courier Gatsby Netlify Form Starter

This is an example starter app that is showcasing how to build a form in
[Gatsby](https://gatsbyjs.com), host it on [Netlify](https://www.netlify.com/) and use
[Netlify functions](https://www.netlify.com/products/functions/) to send a notification using
[Courier](https://www.courier.com/) on every form submit.

## Prerequisites

- Node.js
- yarn
- Netlify Account. Sign up [here](https://app.netlify.com/signup).
- Courier Account.
  Quickly [sign up](https://app.courier.com/signup) for a free account.

> Note that [Chakra-ui](https://chakra-ui.com/), [Formik](https://formik.org/), and
> [Yup](https://github.com/jquense/yup) dependencies are used to quickly build, style, and validate
> the form, but are completely optional.

## Online Demo

Check out the [online demo here](https://vigilant-franklin-82f2dc.netlify.app/).

Note that you can fully customize the form fields.

## One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/trycourier/gatsby-netlify-form-starter)

## Getting started

1. **Clone this repo and change the directory to its root folder.**

2. **Install dependencies:**

```shell
yarn install
```

3. **Link the local repo to a Netlify website:**

```shell
yarn run netlify link
```

4.  **Create a notification on [Courier](https://www.courier.com/).**

    1.  When you sign up you'll see a "Create Notification" button that lets you easily Design, Preview
        and Test notifications.

    2.  Create a notification and select the Channels (Email, Push, SMS, etc.) and Integrations
        (SendGrid, Twilio, Slack, etc.) you want to send it through.

    3.  Create a test event on the next "Preview" step to design the notification. Add any test data
        you can then reference in the notification to the `data` JSON object and any properties that are
        required by your [Integration of choice](https://www.courier.com/providers/) to the `profile` object.
        In our test starter, we have 3 form fields (name, company, and email) and are using
        [SendGrid integration](https://www.courier.com/docs/guides/providers/email/sendgrid/) to send emails
        for every submission, so our test event will look like this:

        ```json
        {
          "data": {
            "name": "John Smith",
            "company": "Acme Inc",
            "email": "john@acme.com"
          },
          "profile": {
            "email": "form-submissions@courier.com"
          },
          "override": {}
        }
        ```

    4.  If you want to [send text messages](https://www.courier.com/docs/guides/providers/sms/twilio/)
        then your `profile` JSON object will look something like this:

        ```json
        {
          "profile": {
            "phone_number": "+14804209586"
          }
        }
        ```

    5.  Build and design your notification however you like. Keep in mind that you can reference any
        value in data with liquid tags anywhere. Like reference `{company}` anywhere to populate with
        the submitter's company value.

    6.  You can switch to the "Send" step to send test notifications using the Test Event you created
        earlier and making it work exactly as you wish.

    7.  Take note of the `Auth Token` and `Notification ID` on this page. You'll need them in just a
        bit.

> You can find code examples calling Courier [/send](https://www.courier.com/docs/reference/send/message/) APIs with
> [@trycourier/courier](https://www.npmjs.com/package/@trycourier/courier) in Netlify Function in the
> [netlify/functions/submit_form.ts](https://github.com/trycourier/gatsby-netlify-form-starter/blob/main/netlify/functions/submit_form.ts) file.

5.  **Set Netlify environment variables:**

    ```shell
    yarn run netlify env:set ENV_VAR "VALUE"
    ```

    1. `COURIER_AUTH_TOKEN` - Courier Auth Token
    2. `COURIER_EVENT` - Courier Notification ID
    3. `COURIER_RECIPIENT` - Courier Profile Email, Phone number, List ID, Pattern, or any other
       identifier required by the Channel Integration you are using

6.  **Now you are ready to run the app and test it:**

    ```shell
    yarn run develop
    ```

    This will run the Gatsby app locally with [Netlify Dev](https://www.netlify.com/products/dev/) to
    make all the Netlify env variables available locally and allow to test Netlify Functions.

    > Be sure to open **localhost:8888** instead of localhost:8000. The latter is the Gatsby server,
    > while the first one is the actual Netlify Dev server which wraps the Gatsby server.

## Additional documentation

Check out additional documentation on [Courier Documentations](https://www.courier.com/docs/).
