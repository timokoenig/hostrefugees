import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  active: boolean
  value: number
  min?: number
  max?: number
  onChange: (newValue: number) => void
}

const NumberInput = (props: Props) => {
  const min = props.min ?? 0
  const max = props.max ?? 10

  const onInc = () => {
    if (props.value + 1 > max) return
    props.onChange(props.value + 1)
  }

  const onDec = () => {
    if (props.value - 1 < min) return
    props.onChange(props.value - 1)
  }

  return (
    <HStack maxW="320px">
      <Button onClick={onDec} isDisabled={props.value == min}>
        -
      </Button>
      <Text fontWeight="semibold" px="5" color={props.active ? 'blue.500' : 'black'}>
        {props.value}
      </Text>
      <Button onClick={onInc} isDisabled={props.value == max}>
        +
      </Button>
    </HStack>
  )
}

export default NumberInput
