import { Button, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import VerificationButton from './verification-button'

type Props = {
  user: MappedUser
  onNext: () => void
}

const VerificationOnboarding = (props: Props) => {
  const { t } = useTranslation('common')
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

  return (
    <>
      <Heading as="h2" size="xl" mt={6} mb={10}>
        {t('onboarding.verification')}
      </Heading>
      <Center mb={10}>
        <Image
          src="/svg/undraw_personal_information_re_vw8a.svg"
          maxWidth="250"
          alt="verification icon"
        />
      </Center>
      <Text mb="10">
        <b>{t('onboarding.verification.subtitle')}</b>
        <br />
        {t('onboarding.verification.text')}
      </Text>
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
          subtitle={t('onboarding.verification.selfie.info')}
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
      <Button
        colorScheme="blue"
        my="10"
        onClick={props.onNext}
        isDisabled={isLoading || photoFront == null || photoBack == null || photoSelfie == null}
      >
        {isLoading ? t('loading') : t('continue')}
      </Button>
    </>
  )
}

export default VerificationOnboarding
