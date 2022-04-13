import { HStack, StackDivider, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { HostType, Place } from '@prisma/client'
import HostSelectionButton from 'components/become-host/host-selection-button'
import React, { useState } from 'react'
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

      <VStack
        spacing={10}
        align="flex-start"
        divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
      >
        <HStack spacing={5}>
          <HostSelectionButton
            image="/svg/undraw_people_re_8spw.svg"
            title="People"
            isSmall={true}
            selected={isPeopleSelected}
            onClick={() => setPeopleSelected(true)}
          />
          <HostSelectionButton
            image="/svg/undraw_cautious_dog_q-83-f.svg"
            title="Pets"
            isSmall={true}
            selected={!isPeopleSelected}
            onClick={() => setPeopleSelected(false)}
          />
        </HStack>
        {isPeopleSelected ? (
          <PeopleForm place={props.place} isLoading={props.isLoading} onChange={props.onChange} />
        ) : (
          <PetsForm place={props.place} isLoading={props.isLoading} onChange={props.onChange} />
        )}
      </VStack>
    </>
  )
}

export default FormSelection
