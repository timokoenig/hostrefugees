import {
  Box,
  Button,
  Flex,
  Input,
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
import { useTranslation } from 'react-i18next'
import { Filter } from '../../state/app'
import NumberInput from './number-input'

type Props = {
  filter: Filter
  onChange: (newFilter: Filter) => void
  isOpen: boolean
  onClose: () => void
}

const FilterModal = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('filter')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex py="5">
            <Text flex="1" fontSize="lg">
              {t('adults')}
            </Text>
            <NumberInput
              active={props.filter.adults !== null}
              value={props.filter.adults ?? 1}
              min={1}
              onChange={newVal => props.onChange({ ...props.filter, adults: newVal })}
            />
          </Flex>
          <Flex py="5">
            <Text flex="1" fontSize="lg">
              {t('children')}
            </Text>
            <NumberInput
              active={props.filter.children !== null}
              value={props.filter.children ?? 0}
              onChange={newVal => props.onChange({ ...props.filter, children: newVal })}
            />
          </Flex>
          <Flex py="5">
            <Text flex="1" fontSize="lg" pr="10">
              {t('city')}
            </Text>
            <Input
              value={props.filter.city ?? ''}
              onChange={e => props.onChange({ ...props.filter, city: e.target.value })}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => props.onChange({ adults: null, children: null, city: null })}
          >
            {t('clearall')}
          </Button>
          <Box flex="1" />
          <Button colorScheme="blue" onClick={props.onClose}>
            {t('apply')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal
