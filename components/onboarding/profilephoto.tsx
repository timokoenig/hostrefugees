/* eslint-disable react/no-unescaped-entities */
import { Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import VerificationButton from './verification-button'

type Props = {
  onNext: () => void
}

const ProfilePhotoOnboarding = (props: Props) => {
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
        Profile Photo
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_selfie_re_h9um.svg" maxWidth="250" />
      </Center>
      <Text color="gray.500" mb="10">
        <b>It's selfie time</b>
        <br />
        You can upload an optional profile photo to increase the chance of getting accepted from the
        host.
      </Text>
      <Center>
        <VerificationButton
          title="Selfie"
          subtitle="Click to upload"
          isDisabled={isLoading}
          onUpload={() => {}}
          onRemove={() => {}}
        />
      </Center>
      <Button colorScheme="blue" my="10" onClick={updateVerification} isDisabled={isLoading}>
        {isLoading ? 'Loading...' : 'Continue wihout photo'}
      </Button>
    </>
  )
}

export default ProfilePhotoOnboarding
