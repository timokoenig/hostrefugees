import {
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction="row" align="center">
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Stack spacing={4}>
        <Heading>Welcome To Germany</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore
        </Text>
        <Stack
          spacing={4}
          divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
        >
          <Feature
            // icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
            text="First Steps"
          />
          <Feature
            // icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
            iconBg={useColorModeValue('green.100', 'green.900')}
            text="A Place To Stay"
          />
          <Feature
            // icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
            iconBg={useColorModeValue('purple.100', 'purple.900')}
            text="How Do I Say This?"
          />
          <Feature
            // icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
            iconBg={useColorModeValue('purple.100', 'purple.900')}
            text="Where Can I Find All Necessities?"
          />
          <Feature
            // icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
            iconBg={useColorModeValue('purple.100', 'purple.900')}
            text="Current Covid Restrictions"
          />
          <Feature
            // icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
            iconBg={useColorModeValue('purple.100', 'purple.900')}
            text="Other Information"
          />
        </Stack>
      </Stack>
      <Flex>
        <Image src="/svg/undraw_a_whole_year_vnfm.svg" />
      </Flex>
    </SimpleGrid>
  )
}
