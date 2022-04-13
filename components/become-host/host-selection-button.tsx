import { Button, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  image: string
  selected: boolean
  isSmall?: boolean
  onClick: () => void
}

const HostSelectionButton = (props: Props) => {
  const backgroundColor = useColorModeValue('white', 'gray.800')
  return (
    <Button
      maxWidth={props.isSmall ? '150px' : '250px'}
      height="auto"
      rounded="10"
      bg={props.selected ? undefined : backgroundColor}
      colorScheme={props.selected ? 'blue' : undefined}
      borderColor="gray.100"
      borderWidth="1px"
      textTransform="uppercase"
      fontSize={{ base: 'md', sm: 'xl' }}
      p={{ base: 2, sm: 5 }}
      flexDirection="column"
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: 'lg',
      }}
      onClick={props.onClick}
    >
      <Stack spacing={0}>
        <Image width="100%" style={{ aspectRatio: '1/1' }} src={props.image} />
        <Text>{props.title}</Text>
      </Stack>
    </Button>
  )
}

export default HostSelectionButton
