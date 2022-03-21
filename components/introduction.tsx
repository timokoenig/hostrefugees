import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'
import { IoBodySharp, IoCheckmarkSharp, IoLogoGithub, IoShieldSharp } from 'react-icons/io5'

const features: { icon: IconType; title: string; text: string }[] = [
  {
    icon: IoBodySharp,
    title: 'Private Places',
    text: 'All available places on this platform are private homes',
  },
  {
    icon: IoCheckmarkSharp,
    title: 'Verified Hosts',
    text: 'Every host needs to verify their identify before a place is offered to a guest',
  },
  {
    icon: IoShieldSharp,
    title: 'Safety Check',
    text: 'The safety check for hosts and guests makes sure that both parties arrive safely',
  },
  {
    icon: IoLogoGithub,
    title: 'Open Source',
    text: 'HostRefugees is an Open Source project on Github to be as transparent as possible',
  },
]

const Introduction = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const iconColor = useColorModeValue('blue.100', 'blue.900')
  return (
    <Box p={4} mb="20">
      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">How Does It Work?</Heading>
        <Text color={textColor} fontSize="xl">
          HostRefugees offers a list of all available private places that you can stay at. If you
          found a place that matches your requirements, you can request to stay there. The host will
          get notified about your request and then you will receive an email as soon as the host
          accepts it. In that email you will find the exact name, address, and other contact
          information to get in touch with the host.
        </Text>
      </Stack>

      <Container maxW="6xl" mt={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, key) => (
            <VStack key={key} textAlign="center">
              <Flex
                rounded="full"
                width={12}
                height={12}
                backgroundColor={iconColor}
                align="center"
                justify="center"
              >
                <Icon as={feature.icon} color="blue.500" width={6} height={6} />
              </Flex>
              <Text fontWeight={600}>{feature.title}</Text>
              <Text color={textColor}>{feature.text}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Introduction
