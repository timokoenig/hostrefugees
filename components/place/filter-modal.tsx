import {
  Box,
  Button,
  Flex,
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
import NumberInput from './number-input'

export type Filter = {
  adults: number | null
  children: number | null
}

type Props = {
  filter: Filter
  onChange: (newFilter: Filter) => void
  isOpen: boolean
  onClose: () => void
}

const FilterModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py="5">
            <Text flex="1" fontSize="lg">
              Adults
            </Text>
            <NumberInput
              active={props.filter.adults !== null}
              value={props.filter.adults ?? 0}
              onChange={newVal => props.onChange({ ...props.filter, adults: newVal })}
            />
          </Flex>
          <Flex py="5">
            <Text flex="1" fontSize="lg">
              Children
            </Text>
            <NumberInput
              active={props.filter.children !== null}
              value={props.filter.children ?? 0}
              onChange={newVal => props.onChange({ ...props.filter, children: newVal })}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => props.onChange({ adults: null, children: null })}>
            Clear All
          </Button>
          <Box flex="1" />
          <Button colorScheme="blue" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
