import { HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { HostType, Place } from '@prisma/client'
import React, { useState } from 'react'
import FormSelectionButton from './form-selection-button'
import PeopleForm from './people-form'
import PetsForm from './pets-form'

type Props = {
  place?: Place | undefined
  isLoading: boolean
  onChange: (place: Place) => void
}

const FormSelection = (props: Props) => {
  const [isPeopleSelected, setPeopleSelected] = useState<boolean>(
    props.place ? props.place.hostType == HostType.PEOPLE : true
  )
  return (
    <>
      <Text
        fontSize={{ base: '16px', lg: '18px' }}
        color={useColorModeValue('blue.500', 'blue.300')}
        fontWeight="500"
        textTransform="uppercase"
        mb="4"
      >
        Who do you like to host?
      </Text>
      <HStack spacing={5} mb="20">
        <FormSelectionButton
          title="Host People"
          selected={isPeopleSelected}
          onClick={() => setPeopleSelected(true)}
        />
        <FormSelectionButton
          title="Host Pets"
          selected={!isPeopleSelected}
          onClick={() => setPeopleSelected(false)}
        />
      </HStack>
      {isPeopleSelected ? (
        <PeopleForm place={props.place} isLoading={props.isLoading} onChange={props.onChange} />
      ) : (
        <PetsForm place={props.place} isLoading={props.isLoading} onChange={props.onChange} />
      )}
    </>
  )
}

export default FormSelection
