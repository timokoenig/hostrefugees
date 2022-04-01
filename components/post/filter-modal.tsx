import {
  Box,
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
import { useTranslation } from 'react-i18next'
import CategoryPicker from './category-picker'
import CityPicker from './city-picker'

type Props = {
  availableCities: string[]
  filter: Filter
  onChange: (newFilter: Filter) => void
  isOpen: boolean
  onClose: () => void
}

type Filter = {
  city: string
  category: string[]
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
          <Box py="5">
            <Text mb="2" fontSize="lg">
              {t('city')}
            </Text>
            <CityPicker
              availableValues={props.availableCities}
              value={props.filter.city}
              onChange={value => props.onChange({ ...props.filter, city: value })}
            />
          </Box>
          <Box py="5">
            <Text mb="2" fontSize="lg">
              {t('category')}
            </Text>
            <CategoryPicker
              value={props.filter.category}
              onChange={value => props.onChange({ ...props.filter, category: value })}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => props.onChange({ city: '', category: [] })}>
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
