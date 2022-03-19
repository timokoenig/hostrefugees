import { Button, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'
import VerificationButton from './verification-button'

type Props = {
  user: MappedUser
  onNext: () => void
}

const VerificationOnboarding = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [photoFront, setPhotoFront] = useState<string | null>(null)
  const [photoBack, setPhotoBack] = useState<string | null>(null)
  const [photoSelfie, setPhotoSelfie] = useState<string | null>(null)

  const updateVerification = async () => {
    try {
      setLoading(true)
      await fetch(`/api/user/${props.user.id}/verify`)
      props.onNext()
    } catch (err: unknown) {
      console.log(err)
    }
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
          image={photoFront}
          title="ID Card"
          subtitle="Front"
          isDisabled={isLoading}
          onUpload={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoFront('https://picsum.photos/900/600')
                resolve()
              }, 3000)
            })
          }}
          onRemove={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoFront(null)
                resolve()
              }, 3000)
            })
          }}
        />
        <VerificationButton
          image={photoBack}
          title="ID Card"
          subtitle="Back"
          isDisabled={isLoading}
          onUpload={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoBack('https://picsum.photos/900/600')
                resolve()
              }, 3000)
            })
          }}
          onRemove={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoBack(null)
                resolve()
              }, 3000)
            })
          }}
        />
        <VerificationButton
          image={photoSelfie}
          title="Selfie"
          subtitle="Hold ID Card next to your face"
          isDisabled={isLoading}
          onUpload={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoSelfie('https://picsum.photos/900/600')
                resolve()
              }, 3000)
            })
          }}
          onRemove={() => {
            return new Promise((resolve, _) => {
              setTimeout(() => {
                setPhotoSelfie(null)
                resolve()
              }, 3000)
            })
          }}
        />
      </SimpleGrid>
      <Button
        colorScheme="blue"
        my="10"
        onClick={updateVerification}
        isDisabled={isLoading || photoFront == null || photoBack == null || photoSelfie == null}
      >
        {isLoading ? 'Loading...' : 'Continue'}
      </Button>
    </>
  )
}

export default VerificationOnboarding
