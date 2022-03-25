import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Request, SafetyCheck, UserRole } from '@prisma/client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser
  request: Request
  safetyCheck: SafetyCheck | null
}

const SafetyCheckComponent = (props: Props): JSX.Element => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [safetyCheck, setSafetyCheck] = useState<SafetyCheck | null>(props.safetyCheck)

  const sendSafetyCheck = async (isSafe: boolean) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/request/${props.request.id}/safetycheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isSafe,
        }),
      })
      if (res.ok) {
        const json = (await res.json()) as SafetyCheck
        setSafetyCheck(json)
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
    <SimpleGrid
      templateColumns={{ sm: '1fr', md: '1fr 2fr' }}
      backgroundColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="xl"
      textAlign="center"
      p="5"
      color="white"
    >
      <Image src="/svg/undraw_security_on_re_e491.svg" />
      <Box color={useColorModeValue('gray.900', 'gray.100')}>
        <Heading size="md" mb="2">
          {t('request.safety')}
        </Heading>
        <Text mb="5">{t('request.safety.info')}</Text>
        {safetyCheck ? (
          <Text fontSize="xl" fontWeight="semibold" color="blue.500">
            {safetyCheck.safe
              ? props.user.role == UserRole.HOST
                ? t('thankyou')
                : t('request.safety.enjoy')
              : t('request.safety.feedback')}
            {}
          </Text>
        ) : (
          <VStack spacing="5">
            <Button
              colorScheme="blue"
              onClick={() => sendSafetyCheck(true)}
              isDisabled={isLoading}
              textTransform="uppercase"
            >
              {props.user.role == UserRole.HOST
                ? t('request.safety.safe.host')
                : t('request.safety.safe.guest')}
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={() => sendSafetyCheck(false)}
              isDisabled={isLoading}
              textTransform="uppercase"
            >
              {t('request.safety.notsafe')}
            </Button>
          </VStack>
        )}
      </Box>
    </SimpleGrid>
  )
}

export default SafetyCheckComponent
