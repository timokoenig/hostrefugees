import { Button, Image, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  image: string
  selected: boolean
  onClick: () => void
}

const HostSelectionButton = (props: Props) => {
  const backgroundColor = useColorModeValue('white', 'gray.800')
  return (
    <Button
      maxWidth="300px"
      height="auto"
      rounded="10"
      bg={props.selected ? undefined : backgroundColor}
      colorScheme={props.selected ? 'blue' : undefined}
      borderColor="gray.100"
      borderWidth="1px"
      textTransform="uppercase"
      fontSize="xl"
      p="10"
      flexDirection="column"
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: 'lg',
      }}
      onClick={props.onClick}
    >
      <Image width="100%" src={props.image} mb="10" />
      {props.title}
    </Button>
  )
}

export default HostSelectionButton
