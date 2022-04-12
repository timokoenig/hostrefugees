/* eslint-disable no-negated-condition */
import { Box, Button, Center, Flex, Heading, HStack, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'
import Menu from './menu'

type Props = {
  user?: MappedUser
}

export default function Navigation(props: Props) {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Box>
      <Center>
        <Flex maxW="7xl" px="4" flex="1" h={16} justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Heading size="lg" fontWeight="semibold" color="blue.500">
              <Link href="/">HostRefugees</Link>
            </Heading>
          </HStack>
          {props.user?.id != undefined ? (
            <Flex alignItems="center">
              <Menu user={props.user} />
            </Flex>
          ) : (
            <Flex alignItems="center">
              <Button
                variant="solid"
                colorScheme="blue"
                size="sm"
                mr={4}
                onClick={() => router.push('/become-host')}
              >
                {t('becomehost')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
                {t('login')}
              </Button>
            </Flex>
          )}
        </Flex>
      </Center>
    </Box>
  )
}
