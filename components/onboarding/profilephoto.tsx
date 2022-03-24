/* eslint-disable react/no-unescaped-entities */
import { Button, Center, Heading, Image, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import VerificationButton from './verification-button'

type Props = {
  user: MappedUser
  onNext: () => void
}

const ProfilePhotoOnboarding = (props: Props) => {
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | null>(null)

  const uploadProfilePhoto = async (file: File | null) => {
    try {
      setLoading(true)
      const body = new FormData()
      if (file !== null) {
        body.append('file', file)
      }
      const res = await fetch(`/api/user/${props.user.id}/photo`, { method: 'POST', body })
      if (res.ok) {
        props.onNext()
      } else {
        toast({
          title: 'Request failed',
          description: 'Please try again',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Heading as="h2" size="xl" mt={6} mb={10}>
        Profile Photo
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_selfie_re_h9um.svg" maxWidth="250" />
      </Center>
      <Text mb="10">
        <b>It's selfie time</b>
        <br />
        You can upload an optional profile photo to increase the chance of getting accepted from the
        host.
      </Text>
      <Center>
        <VerificationButton
          image={photo ? URL.createObjectURL(photo) : null}
          title={photo == null ? 'Selfie' : ''}
          subtitle={photo == null ? 'Click to upload' : ''}
          isDisabled={isLoading}
          onUpload={async file => {
            setPhoto(file)
          }}
          onRemove={async () => {
            await uploadProfilePhoto(null)
          }}
        />
      </Center>
      <Button
        colorScheme="blue"
        my="10"
        onClick={async () => {
          await uploadProfilePhoto(photo)
          props.onNext()
        }}
        isDisabled={isLoading}
      >
        {isLoading ? 'Loading...' : photo == null ? 'Continue wihout photo' : 'Continue'}
      </Button>
    </>
  )
}

export default ProfilePhotoOnboarding
