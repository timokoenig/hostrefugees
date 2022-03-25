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
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser
  request: Request
  safetyCheck: SafetyCheck | null
}

const SafetyCheckComponent = (props: Props): JSX.Element => {
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
          Your Safety Is Our Priority!
        </Heading>
        <Text mb="5">
          We want to make sure that our guests arrive safely at their place. As soon as you arrive,
          please click the button below to let us know that everything is ok.
        </Text>
        {safetyCheck ? (
          <Text fontSize="xl" fontWeight="semibold" color="blue.500">
            {safetyCheck.safe
              ? props.user.role == UserRole.HOST
                ? 'Thank You!'
                : 'Enjoy your stay!'
              : 'Thank you for your feedback'}
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
              {props.user.role == UserRole.HOST ? 'My guest is safe' : 'I am safe'}
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={() => sendSafetyCheck(false)}
              isDisabled={isLoading}
              textTransform="uppercase"
            >
              Something is not right
            </Button>
          </VStack>
        )}
      </Box>
    </SimpleGrid>
  )
}

export default SafetyCheckComponent
