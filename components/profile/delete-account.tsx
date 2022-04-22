import { Box, Button, Heading, useDisclosure, useToast } from '@chakra-ui/react'
import ConfirmModal from 'components/modal/confirm'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser
}

const DeleteAccount = (props: Props) => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onDelete = async (confirm: boolean) => {
    onClose()
    if (!confirm) return
    try {
      setLoading(true)
      const res = await fetch(`/api/user/${props.user.id}`, { method: 'DELETE' })
      if (res.ok) {
        await router.push('/')
      } else {
        throw new Error(res.statusText)
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
    <Box mb="20">
      <Heading size="md" mb="5">
        {t('profile.account')}
      </Heading>
      <Box>
        <Button onClick={onOpen} isDisabled={isLoading}>
          {t(isLoading ? 'loading' : 'profile.account.delete')}
        </Button>
      </Box>
      <ConfirmModal
        title={t('profile.account.delete')}
        subtitle={t('profile.account.delete.info')}
        isOpen={isOpen}
        onClose={onDelete}
      />
    </Box>
  )
}

export default DeleteAccount
