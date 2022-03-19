import { Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import LanguagePicker from 'components/common/languagepicker'
import React, { useState } from 'react'

type Props = {
  onNext: () => void
}

const LanguageOnboarding = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[]>([])

  const updateLanguage = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      props.onNext()
    }, 3000)
  }

  return (
    <>
      <Heading as="h2" size="xl" mt={6} mb={10}>
        We are happy to welcome you at{' '}
        <Text as="span" color="blue.400">
          HostRefugees
        </Text>
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_audio_conversation_re_ptsl.svg" maxWidth="250" />
      </Center>
      <Text color="gray.500" mb="5">
        To improve the communication for hosts and guests, please select all languages you speak
      </Text>
      <LanguagePicker onChange={setLanguages} isDisabled={isLoading} />
      <Button
        colorScheme="blue"
        my="10"
        onClick={updateLanguage}
        isDisabled={languages.length == 0 || isLoading}
      >
        {isLoading ? 'Loading...' : 'Continue'}
      </Button>
    </>
  )
}

export default LanguageOnboarding
