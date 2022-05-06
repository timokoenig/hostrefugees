import { Badge, Box, Link, Switch, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser
  senderEnabled: boolean
  recipientEnabled: boolean
}

const TranslationSwitch = (props: Props) => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const [isEnabled, setEnabled] = useState<boolean>(props.senderEnabled)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onChange = async (val: boolean) => {
    if (isLoading) return
    setLoading(true)
    setEnabled(val)
    try {
      const res = await fetch(`/api/user/${props.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageTranslation: val,
        }),
      })
      if (res.ok) {
        setLoading(false)
        toast({
          title: t('chat.translation.updated'),
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        throw new Error(res.statusText)
      }
    } catch {
      toast({
        title: 'Updatae failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Box pt="1" px="1">
      <Switch size="sm" onChange={() => onChange(!isEnabled)} isChecked={isEnabled} mr="2" />
      <Text fontSize="xs" display="inline" color={useColorModeValue('white', 'gray.500')} mr="2">
        {t('chat.translation')}
      </Text>
      {!props.recipientEnabled && (
        <Badge variant="subtle" colorScheme="red" size="lg" mr="2">
          {t('disabled')}
        </Badge>
      )}
      <Link
        href="/profile"
        textDecoration="underline"
        fontSize="xs"
        display="inline"
        color={useColorModeValue('white', 'gray.500')}
      >
        {t('chat.readmore')}
      </Link>
    </Box>
  )
}

export default TranslationSwitch
