import * as React from "react";
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
} from "@chakra-ui/react";
import { Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const IndexPage = () => {
  const submitHandler = () => {};

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
          initialValues={{
            name: "",
            company: "",
            email: "",
          }}
          validationSchema={FormSchema}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
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

              <Button type="submit" colorScheme="teal" isFullWidth>
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
