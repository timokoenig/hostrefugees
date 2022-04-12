import { Image, Link } from '@chakra-ui/react'
import React from 'react'

const GoFundMe = () => {
  return (
    <Link
      href="https://gofund.me/c60deb9a"
      isExternal
      bgColor="green.500"
      py="5px"
      px="3"
      height="36px"
      flexDirection="row"
      display="flex"
      fontWeight="bold"
      color="white"
      borderRadius="25"
      _hover={{
        backgroundColor: 'green.600',
      }}
    >
      <Image height="26" src="/svg/gofundme.svg" alt="GoFundMe" mr="3" /> GoFundMe
    </Link>
  )
}

export default GoFundMe
