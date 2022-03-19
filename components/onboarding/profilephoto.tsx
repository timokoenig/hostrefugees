/* eslint-disable react/no-unescaped-entities */
import { Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import VerificationButton from './verification-button'

type Props = {
  user: MappedUser
  onNext: () => void
}

const ProfilePhotoOnboarding = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<string | null>(null)

  const updateVerification = async () => {
    try {
      setLoading(true)
      await fetch(`/api/user/${props.user.id}/photo`)
      props.onNext()
    } catch (err: unknown) {
      console.log(err)
    }
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
          image={photo}
          title={photo == null ? 'Selfie' : ''}
          subtitle={photo == null ? 'Click to upload' : ''}
          isDisabled={isLoading}
          onUpload={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhoto('https://picsum.photos/900/600')
                resolve()
              }, 3000)
            })
          }}
          onRemove={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhoto(null)
                resolve()
              }, 3000)
            })
          }}
        />
      </Center>
      <Button colorScheme="blue" my="10" onClick={updateVerification} isDisabled={isLoading}>
        {isLoading ? 'Loading...' : photo == null ? 'Continue wihout photo' : 'Continue'}
      </Button>
    </>
  )
}

export default ProfilePhotoOnboarding
