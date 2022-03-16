import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  color?: string
  size?: string
  fullWidth?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const CustomButton = (props: Props) => (
  <Button
    type={props.onClick ? 'button' : 'submit'}
    rounded="10"
    w={props.fullWidth ? 'full' : undefined}
    size={props.size ?? 'lg'}
    bg={props.color ?? 'blue.500'}
    color="white"
    textTransform="uppercase"
    _hover={{
      transform: 'translateY(2px)',
      boxShadow: props.size ?? 'lg',
    }}
    isDisabled={props.isDisabled}
    onClick={props.onClick}
  >
    {props.title}
  </Button>
)

export default CustomButton
