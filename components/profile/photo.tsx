import { Avatar, Box, Button, Heading, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MappedUser } from 'utils/models'

type Props = {
  user: MappedUser & {
    lastname: string
    email: string
    verified: boolean
    verificationSubmitted: boolean
    waitlist: boolean
  }
}

const Photo = (props: Props) => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const [photo, setPhoto] = useState<string | null>(props.user.photo)
  const [isLoading, setLoading] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const uploadPhoto = async (file: File) => {
    try {
      setLoading(true)
      const body = new FormData()
      body.append('file', file)
      const res = await fetch(`/api/user/${props.user.id}/photo`, { method: 'POST', body })
      if (res.ok) {
        setPhoto(`/api/user/${props.user.id}/photo`)
      } else {
        throw new Error(res.statusText)
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  const onFileChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const inputTarget = e.target as HTMLInputElement
    if (!inputTarget.files || inputTarget.files.length == 0) return
    setLoading(true)
    await uploadPhoto(inputTarget.files[0])
    setLoading(false)
  }

  const onClickUpload = async () => {
    inputFileRef.current?.click()
  }

  return (
    <Box mb="20">
      <Heading size="md" mb="5">
        Photo
      </Heading>
      <Avatar size="2xl" mb="5" src={photo ?? undefined} />
      <Box>
        <input type="file" ref={inputFileRef} onChange={onFileChange} hidden={true} />
        <Button onClick={onClickUpload} isDisabled={isLoading}>
          {t(isLoading ? 'loading' : 'profile.photo')}
        </Button>
      </Box>
    </Box>
  )
}

export default Photo
