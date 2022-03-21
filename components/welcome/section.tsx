import { Flex, Heading, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'

interface HeaderProps {
  text: string
  iconBg: string
  icon: ReactElement
}

const Header = ({ text, icon, iconBg }: HeaderProps) => {
  return (
    <Stack direction="row" align="center">
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg={iconBg} mr="2">
        {icon}
      </Flex>
      <Heading as="h2" size="lg">
        {text}
      </Heading>
    </Stack>
  )
}

type Props = {
  id: string
  title: string
  icon: IconType
  color: string
  children?: JSX.Element | JSX.Element[]
}

const Section = (props: Props) => {
  return (
    <Stack id={props.id} spacing={4}>
      <Header
        text={props.title}
        icon={<Icon as={props.icon} color={`${props.color}.500`} w={5} h={5} />}
        iconBg={useColorModeValue(`${props.color}.100`, `${props.color}.900`)}
      />
      {props.children}
    </Stack>
  )
}

export default Section
