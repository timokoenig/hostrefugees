import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const CustomMenu = () => {
  const router = useRouter()

  const onLogout = async () => {
    try {
      await fetch('/api/logout')
      await router.push('/')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
        <Avatar size="md" src="/svg/undraw_profile_pic_ic-5-t.svg" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>
        <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuDivider />
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default CustomMenu
