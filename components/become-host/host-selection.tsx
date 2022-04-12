import { Button, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import HostSelectionButton from './host-selection-button'

type Props = {
  onContinue: () => void
}

const HostSelection = (props: Props) => {
  const [isPeopleSelected, setPeopleSelected] = useState<boolean>(true)
  return (
    <Stack spacing="10">
      <Text textAlign="center">
        We are delighted to welcome you as a host on our platform.
        <br />
        Please select one of the options below whether you like to host people or pets.
      </Text>
      <Center>
        <SimpleGrid columns={2} spacing="10">
          <HostSelectionButton
            image="/svg/undraw_people_re_8spw.svg"
            title="People"
            selected={isPeopleSelected}
            onClick={() => setPeopleSelected(true)}
          />
          <HostSelectionButton
            image="/svg/undraw_cautious_dog_q-83-f.svg"
            title="Pets"
            selected={!isPeopleSelected}
            onClick={() => setPeopleSelected(false)}
          />
        </SimpleGrid>
      </Center>
      {isPeopleSelected ? (
        <Center>
          <Text>Some information for people hosts</Text>
        </Center>
      ) : (
        <Center>
          <Text>Some information for pet hosts</Text>
        </Center>
      )}
      <Center>
        <Button colorScheme="blue" size="lg" onClick={props.onContinue}>
          Continue To Sign Up
        </Button>
      </Center>
    </Stack>
  )
}

export default HostSelection
