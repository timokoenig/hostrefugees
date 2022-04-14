/* eslint-disable react/no-unescaped-entities */
import { Button, Center, Heading, Image, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import ProfileButton from './profile-button'

type Props = {
  user: MappedUser
  onNext: () => void
}

const ProfilePhotoOnboarding = (props: Props) => {
  const { t } = useTranslation('common')
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
        {t('onboarding.photo')}
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_selfie_re_h9um.svg" maxWidth="250" alt="profile photo icon" />
      </Center>
      <Text mb="10">
        <b>{t('onboarding.photo.subtitle')}</b>
        <br />
        {t('onboarding.photo.text')}
      </Text>
      <Center>
        <ProfileButton
          image={photo ? URL.createObjectURL(photo) : null}
          title={photo == null ? t('onboarding.photo.selfie') : ''}
          subtitle={photo == null ? t('onboarding.photo.upload') : ''}
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
        {isLoading
          ? t('loading')
          : photo == null
          ? t('onboarding.photo.continuewithout')
          : t('continue')}
      </Button>
    </>
  )
}

export default ProfilePhotoOnboarding
