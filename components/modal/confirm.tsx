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
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  subtitle: string
  isOpen: boolean
  onClose: (confirm: boolean) => void
}

const ConfirmModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{props.subtitle}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" variant="ghost" onClick={() => props.onClose(false)} mr="5">
            No
          </Button>
          <Button colorScheme="red" onClick={() => props.onClose(true)}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
