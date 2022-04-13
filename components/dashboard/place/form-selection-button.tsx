import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  selected: boolean
  onClick: () => void
}

const FormSelectionButton = (props: Props) => {
  return (
    <Button
      title="Host People"
      bg={props.selected ? undefined : 'white'}
      colorScheme={props.selected ? 'blue' : undefined}
      borderColor="gray.100"
      borderWidth="1px"
      textTransform="uppercase"
      flexDirection="column"
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: 'lg',
      }}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  )
}

export default FormSelectionButton
