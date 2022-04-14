import { Box, Button, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import VerificationButton from '../onboarding/profile-button'

type Props = {
  user: MappedUser
}

const VerificationForm = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [photoFront, setPhotoFront] = useState<string | null>(null)
  const [photoBack, setPhotoBack] = useState<string | null>(null)
  const [photoSelfie, setPhotoSelfie] = useState<string | null>(null)

  const uploadDocument = async (type: string, file: File | null) => {
    setLoading(true)
    if (file == null) {
      // Delete file
      await fetch(`/api/user/${props.user.id}/document/${type}`, { method: 'DELETE' })
    } else {
      // Upload file
      const body = new FormData()
      body.set('type', type)
      body.append('file', file)
      await fetch(`/api/user/${props.user.id}/document`, { method: 'POST', body })
    }
    setLoading(false)
  }

  const onSubmit = async () => {
    if (photoFront == null || photoBack == null || photoSelfie == null) return
    await router.replace('/profile')
  }

  return (
    <Box textAlign="center">
      <Heading as="h2" size="xl" mt={6} mb={10}>
        {t('profile.verification')}
      </Heading>
      <Center mb="10">
        <Image
          src="/svg/undraw_personal_information_re_vw8a.svg"
          maxWidth="250"
          alt="verification icon"
        />
      </Center>
      <Text mb="10">
        <b>{t('profile.verification.subtitle')}</b>
        <br />
        {t('profile.verification.text')}
      </Text>
      <Center>
        <SimpleGrid columns={[1, 2, 3]} spacing="10">
          <VerificationButton
            image={photoFront}
            title={t('idcard')}
            subtitle={t('front')}
            isDisabled={isLoading}
            onUpload={async file => {
              await uploadDocument('front', file)
              setPhotoFront(URL.createObjectURL(file))
            }}
            onRemove={async () => {
              await uploadDocument('front', null)
              setPhotoFront(null)
            }}
          />
          <VerificationButton
            image={photoBack}
            title={t('idcard')}
            subtitle={t('back')}
            isDisabled={isLoading}
            onUpload={async file => {
              await uploadDocument('back', file)
              setPhotoBack(URL.createObjectURL(file))
            }}
            onRemove={async () => {
              await uploadDocument('back', null)
              setPhotoBack(null)
            }}
          />
          <VerificationButton
            image={photoSelfie}
            title={t('selfie')}
            subtitle={t('profile.verification.selfie.info')}
            isDisabled={isLoading}
            onUpload={async file => {
              await uploadDocument('selfie', file)
              setPhotoSelfie(URL.createObjectURL(file))
            }}
            onRemove={async () => {
              await uploadDocument('selfie', null)
              setPhotoSelfie(null)
            }}
          />
        </SimpleGrid>
      </Center>
      <Button
        colorScheme="blue"
        my="10"
        onClick={onSubmit}
        isDisabled={isLoading || photoFront == null || photoBack == null || photoSelfie == null}
      >
        {isLoading ? t('loading') : t('submit')}
      </Button>
    </Box>
  )
}

export default VerificationForm
