import * as Yup from "yup";
import { CourierClient } from "@trycourier/courier";
import { Handler, HandlerResponse } from "@netlify/functions";

const bodySchema = Yup.object().shape({
  name: Yup.string().required(),
  company: Yup.string().required(),
  email: Yup.string().email().required(),
});

const courier = CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

const buildResponse = (statusCode: number, body: object): HandlerResponse => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return buildResponse(405, { error: "Method Not Allowed" });
  }

  let params: Yup.Asserts<typeof bodySchema>;
  try {
    params = JSON.parse(event.body);

    await bodySchema.validate(params);
  } catch {
    return buildResponse(400, { error: "Bad Request" });
  }

  try {
    const response = await courier.send({
      eventId: process.env.COURIER_EVENT_ID,
      recipientId: process.env.COURIER_RECIPIENT,
      profile: {
        // > For the email Integrations `email` property is required
        email: process.env.COURIER_RECIPIENT,
        // > For text message it will look something like this:
        //
        //    phone_number: process.env.COURIER_RECIPIENT,
        //
        // > Please check the docs for your Integration for exact configuration
      },
      data: {
        name: params.name,
        company: params.company,
        email: params.email,
      },
      override: {},
    });

    return buildResponse(201, response);
  } catch (error) {
    return buildResponse(500, { error: "Internal Server Error" });
  }
};

export { handler };
