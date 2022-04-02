import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user?: MappedUser
}

const CustomMenu = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const toast = useToast()

  const onLogout = async () => {
    try {
      await fetch('/api/logout')
      router.reload()
    } catch {
      toast({
        title: 'Logout failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
        <Avatar size="sm" src={props.user ? `/api/user/${props.user.id}/photo` : undefined} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => router.push('/dashboard')}>{t('dashboard')}</MenuItem>
        <MenuItem onClick={() => router.push('/profile')}>{t('profile')}</MenuItem>
        <MenuDivider />
        <MenuItem onClick={onLogout}>{t('logout')}</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default CustomMenu
