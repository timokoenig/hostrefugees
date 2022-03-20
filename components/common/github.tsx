import { Image, Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Github = () => (
  <Link href="https://github.com/timokoenig/hostrefugees" isExternal>
    <Image
      height="36px"
      src={useColorModeValue('/GitHub-Mark-120px-plus.png', '/GitHub-Mark-Light-120px-plus.png')}
      alt="Github"
    />
  </Link>
)

export default Github
