import { Button, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import VerificationButton from './verification-button'

type Props = {
  onNext: () => void
}

const VerificationOnboarding = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const updateVerification = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      props.onNext()
    }, 3000)
  }

  return (
    <>
      <Heading as="h2" size="xl" mt={6} mb={10}>
        Profile Verification
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_personal_information_re_vw8a.svg" maxWidth="250" />
      </Center>
      <Text color="gray.500" mb="10">
        <b>The safety of our guests is important to us.</b>
        <br />
        Please upload the following three documents so we can verify your identity. We will manually
        check these documents and activate your account. Until then you can create places, but they
        won&apos;t appear in the search.
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing="10">
        <VerificationButton
          title="ID Card"
          subtitle="Front"
          isDisabled={isLoading}
          onUpload={() => {}}
          onRemove={() => {}}
        />
        <VerificationButton
          title="ID Card"
          subtitle="Back"
          isDisabled={isLoading}
          onUpload={() => {}}
          onRemove={() => {}}
        />
        <VerificationButton
          title="Selfie"
          subtitle="Hold ID Card next to your face"
          isDisabled={isLoading}
          onUpload={() => {}}
          onRemove={() => {}}
        />
      </SimpleGrid>
      <Button colorScheme="blue" my="10" onClick={updateVerification} isDisabled={isLoading}>
        {isLoading ? 'Loading...' : 'Continue'}
      </Button>
    </>
  )
}

export default VerificationOnboarding
