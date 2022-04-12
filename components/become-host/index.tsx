import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Container, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import HostForm from './host-form'
import HostSelection from './host-selection'

const Register = () => {
  const { t } = useTranslation('common')
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <Container maxW="7xl">
      <Center mb="10">
        <Heading fontSize="4xl">{t('becomehost')}</Heading>
      </Center>
      {showForm ? (
        <>
          <Box mb="5">
            <Button
              pl="0"
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => setShowForm(false)}
            >
              Show Host Information
            </Button>
          </Box>
          <HostForm />
        </>
      ) : (
        <HostSelection onContinue={() => setShowForm(true)} />
      )}
    </Container>
  )
}

export default Register
