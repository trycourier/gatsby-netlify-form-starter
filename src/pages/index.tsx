import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const initialValues = {
  name: "",
  company: "",
  email: "",
};

type Values = typeof initialValues;

const IndexPage = () => {
  const submitHandler = useCallback(
    async (values: Values, helpers: FormikHelpers<Values>) => {
      try {
        const response = await fetch("/.netlify/functions/submit_form", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) throw new Error("Request failed");

        helpers.resetForm();
        helpers.setStatus("success");
      } catch {
        helpers.setStatus("error");
      }
    },
    []
  );

  return (
    <>
      <Helmet>
        <title>Gatsby Netlify Form Starter | Courier</title>
      </Helmet>

      <Container my={8}>
        <Heading as="h4" size="md" textAlign="center">
          Welcome to the Gatsby Netlify Form Starter.
        </Heading>
        <Text textAlign="center" mt={2} mb={12} fontSize="lg">
          Select the options for your notification below.
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors, touched, isSubmitting, status }) => (
            <form onSubmit={handleSubmit}>
              {status && (
                <Alert status={status} mb={8}>
                  <AlertIcon />
                  <AlertDescription>
                    {status === "error"
                      ? "Error submitting the form"
                      : "Successfully submitted"}
                  </AlertDescription>
                </Alert>
              )}

              <Field name="name">
                {({ field }: FieldProps) => (
                  <FormControl mb={8} isInvalid={!!errors.name && touched.name}>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="company">
                {({ field }: FieldProps) => (
                  <FormControl
                    mb={8}
                    isInvalid={!!errors.company && touched.company}
                  >
                    <FormLabel>Company</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.company}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl
                    mb={8}
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                colorScheme="teal"
                isFullWidth
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>

        <Flex mt={12} justify="center">
          <Link
            mx={4}
            href="https://github.com/trycourier/gatsby-netlify-form-starter"
          >
            Checkout on Github
          </Link>
          <Link mx={4} href="https://courier.com">
            Powered by Courier
          </Link>
        </Flex>
      </Container>
    </>
  );
};

export default IndexPage;
