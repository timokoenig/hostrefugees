import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user?: MappedUser & { waitlist: boolean }
}

const Waitlist = (props: Props) => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const router = useRouter()
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const [waitlist, setWaitlist] = useState<boolean>(props.user?.waitlist ?? false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onClickSubscribe = async () => {
    if (props.user?.id == undefined) {
      await router.push('/login?page=profile')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/user/${props.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ waitlist: true }),
      })
      if (!res.ok) throw new Error(res.statusText)
      setWaitlist(true)
      toast({
        title: t('waitlist.confirmation'),
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
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

  if (waitlist) return null

  return (
    <Box p={4} mb="20">
      <Stack spacing={4} as={Container} textAlign="center">
        <Heading fontSize="3xl">{t('waitlist.title')}</Heading>
        <Text fontSize="lg" color={textColor}>
          {t('waitlist.text')}
        </Text>
        <Box>
          <Button colorScheme="blue" onClick={onClickSubscribe} isDisabled={isLoading}>
            {t(isLoading ? 'loading' : 'waitlist.button')}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Waitlist
