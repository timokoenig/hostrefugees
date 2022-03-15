import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react'
import React from 'react'

type Props = {
  value: number
  onChange: (newValue: number) => void
}

const NumberInput = (props: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps({ readOnly: true })

  return (
    <HStack maxW="320px">
      <Button {...inc}>+</Button>
      <Input {...input} onChange={e => props.onChange(parseInt(e.target.value, 10))} />
      <Button {...dec}>-</Button>
    </HStack>
  )
}

export default NumberInput
