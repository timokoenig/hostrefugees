import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  title: string
  subtitle: string
  isDisabled: boolean
  onUpload: () => void
  onRemove: () => void
}

const VerificationButton = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string | null>(null)

  const onUpload = () => {
    setLoading(true)
    setTimeout(() => {
      setImage('https://picsum.photos/900/600')
      setLoading(false)
    }, 3000)
  }

  const onRemove = () => {
    setLoading(true)
    setTimeout(() => {
      setImage(null)
      setLoading(false)
    }, 3000)
  }

  if (isLoading) {
    return (
      <Box
        borderWidth="1px"
        borderColor="gray.300"
        borderRadius="lg"
        fontSize="sm"
        flexDirection="column"
      >
        <Text fontWeight="semibold" mt="2">
          Loading...
        </Text>
      </Box>
    )
  }

  if (image === null) {
    return (
      <Button
        borderWidth="1px"
        borderColor="gray.300"
        p="10"
        fontSize="sm"
        flexDirection="column"
        onClick={onUpload}
        isDisabled={props.isDisabled}
      >
        {props.title}
        <Text fontWeight="normal" fontSize="xs" mt="2">
          {props.subtitle}
        </Text>
      </Button>
    )
  }

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      fontSize="sm"
      flexDirection="column"
    >
      <Image rounded="md" alt="product image" src={image} fit="cover" align="center" w="100%" />
      <Text fontWeight="semibold" mt="2">
        {props.title}
      </Text>
      <Text fontWeight="normal" fontSize="xs" mt="2">
        {props.subtitle}
      </Text>
      <Button
        m="2"
        variant="ghost"
        colorScheme="red"
        onClick={onRemove}
        isDisabled={props.isDisabled}
      >
        Remove
      </Button>
    </Box>
  )
}

export default VerificationButton
