import {FastField, Form, Formik, FormikHelpers} from 'formik'

import {Button, Container, Stack, Textarea} from '@chakra-ui/react'

interface Values {
  message: string
}

export function MessageList() {
  return (
    <Container>
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={handleSubmit}
      >
        <Stack
          as={Form}
          bgColor="white"
          borderRadius="base"
          boxShadow="base"
          padding="4"
          spacing="4"
        >
          <FastField name="message">
            {({field}) => (
              <Textarea {...field} placeholder="Type a message..." />
            )}
          </FastField>
          <Button colorScheme="blue" type="submit">
            Send Message
          </Button>
        </Stack>
      </Formik>
    </Container>
  )

  function handleSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    console.log(`values: `, values)
  }
}
