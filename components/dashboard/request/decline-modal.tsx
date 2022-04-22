import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: (confirm: boolean, message: string | null) => void
}

const DeclineModal = (props: Props) => {
  const { t } = useTranslation('common')
  const [message, setMessage] = useState<string>('')
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose(false, null)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('request.decline.modal.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="5">{t('request.decline.modal.subtitle')}</Text>
          <Textarea value={message} onChange={e => setMessage(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            variant="ghost"
            onClick={() => props.onClose(false, null)}
            mr="5"
          >
            {t('cancel')}
          </Button>
          <Button
            colorScheme="red"
            onClick={() => props.onClose(true, message == '' ? null : message)}
          >
            {t('continue')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeclineModal
