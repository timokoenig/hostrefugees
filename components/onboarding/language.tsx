import { Button, Center, Heading, Image, Text, useToast } from '@chakra-ui/react'
import LanguagePicker from 'components/common/languagepicker'
import React, { useState } from 'react'
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser
  onNext: () => void
}

const LanguageOnboarding = (props: Props) => {
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[]>([])

  const updateLanguage = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/user/${props.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languages,
        }),
      })
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
        We are happy to welcome you at{' '}
        <Text as="span" color="blue.400">
          HostRefugees
        </Text>
      </Heading>
      <Center mb={10}>
        <Image src="/svg/undraw_audio_conversation_re_ptsl.svg" maxWidth="250" />
      </Center>
      <Text mb="5">
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
