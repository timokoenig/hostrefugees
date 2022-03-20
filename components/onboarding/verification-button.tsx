import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

type Props = {
  image: string | null
  title: string
  subtitle?: string
  isDisabled: boolean
  onUpload: (file: File) => Promise<void>
  onRemove: () => Promise<void>
}

const VerificationButton = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onFileChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const inputTarget = e.target as HTMLInputElement
    if (!inputTarget.files || inputTarget.files.length == 0) return
    setLoading(true)
    await props.onUpload(inputTarget.files[0])
    setLoading(false)
  }

  const onClickUpload = async () => {
    inputFileRef.current?.click()
  }

  const onRemove = async () => {
    setLoading(true)
    await props.onRemove()
    setLoading(false)
  }

  if (isLoading) {
    return (
      <Box
        borderWidth="1px"
        borderColor="gray.300"
        borderRadius="lg"
        fontSize="sm"
        flexDirection="column"
        p="10"
        maxWidth="300"
      >
        <Text fontWeight="semibold">Loading...</Text>
      </Box>
    )
  }

  if (props.image === null) {
    return (
      <>
        <input type="file" ref={inputFileRef} onChange={onFileChange} hidden={true} />
        <Button
          borderWidth="1px"
          borderColor="gray.300"
          p="10"
          fontSize="sm"
          flexDirection="column"
          onClick={onClickUpload}
          isDisabled={props.isDisabled}
          maxWidth="300"
        >
          {props.title}
          {props.subtitle && (
            <Text fontWeight="normal" fontSize="xs" mt="2">
              {props.subtitle}
            </Text>
          )}
        </Button>
      </>
    )
  }

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      fontSize="sm"
      flexDirection="column"
      maxWidth="300"
    >
      <Image
        rounded="md"
        alt="product image"
        src={props.image}
        fit="cover"
        align="center"
        w="100%"
      />
      <Text fontWeight="semibold" mt="2">
        {props.title}
      </Text>
      {props.subtitle && (
        <Text fontWeight="normal" fontSize="xs" mt="2">
          {props.subtitle}
        </Text>
      )}
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
