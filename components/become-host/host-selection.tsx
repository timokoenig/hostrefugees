/* eslint-disable jsx-a11y/accessible-emoji */
import {
  Button,
  Center,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import HostSelectionButton from './host-selection-button'

type Props = {
  onContinue: () => void
}

const HostSelection = (props: Props) => {
  const [isPeopleSelected, setPeopleSelected] = useState<boolean>(true)
  return (
    <Stack spacing="10">
      <Center>
        <Text textAlign="center" maxW="520px">
          <b>We are delighted to welcome you as a host on our platform</b>
          <br />
          Please select one of the options below whether you like to host people or pets
        </Text>
      </Center>
      <Center>
        <SimpleGrid columns={2} spacing="20px">
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
          <Stack textAlign="left" maxW="520px">
            <Heading size="md">
              Was ist zu beachten, wenn Sie Flüchtlinge bei Ihnen aufnehmen?
            </Heading>
            <UnorderedList pl="5">
              <ListItem>
                Bitte erstellen Sie nur <b>ernst gemeinte</b> Angebote
              </ListItem>
              <ListItem>
                <b>Sprachliche Barrieren</b> sollten kein Ausschlusskriterium sein
              </ListItem>
              <ListItem>
                Stellen Sie bitte sicher, dass Ihre Gäste ein ausgestattetes <b>Bett</b> und Zugung
                zu einem <b>Badezimmer</b> haben
              </ListItem>
              <ListItem>
                Bitte respektieren Sie die <b>Privatsphäre</b> Ihrer Gäste
              </ListItem>
              <ListItem>
                Beachten Sie, dass die ukrainischen Flüchtlinge <b>keine Haftpflichtversicherung</b>{' '}
                haben und Sie für eventuelle Schäden aufkommen müssen. Viele deutsche Versicherungen
                bieten eine <b>Erweiterung Ihres Versicherungsschutzes</b> an. Schauen Sie auf
                unserem{' '}
                <Link href="/activities" color="blue.500">
                  Schwarzen Brett
                </Link>{' '}
                oder informieren Sie sich direkt bei Ihrer Versicherung
              </ListItem>
            </UnorderedList>
          </Stack>
        </Center>
      ) : (
        <Center>
          <Stack textAlign="left" maxW="520px">
            <Heading size="md">
              Was muss ich beachten, wenn ich ein Haustier aufnehmen möchte?
            </Heading>

            <UnorderedList pl="5">
              <ListItem>
                Bitte erstellen Sie nur <b>ernst gemeinte</b> Angebote
              </ListItem>
              <ListItem>
                Auch die Tiere stehen unter großem Stress. Bitte behandeln Sie mit{' '}
                <b>Nachsicht und viel Liebe</b>{' '}
                <Text as="span" color="red.500">
                  ♥️
                </Text>
              </ListItem>
              <ListItem>
                Stellen Sie eine <b>sichere Umgebung</b> für die Tiere bereit
              </ListItem>
              <ListItem>
                <b>Anfallende Kosten</b>:
                <List>
                  <ListItem>- Futter</ListItem>
                  <ListItem>- Tierarztbesuche</ListItem>
                  <ListItem>- Tollwutimpfung</ListItem>
                  <ListItem>- Chip</ListItem>
                </List>
                Diese müssen von Ihnen übernommen werden, wenn nicht anders mit den Besitzern
                abgesprochen
              </ListItem>
              <ListItem>
                Je nach Auflage muss das aufgenommene Haustier{' '}
                <b>21 Tage lang in eine häusliche Quarantäne</b>. Informieren Sie sich vorher welche
                Auflagen das Haustier erfüllen muss
              </ListItem>
              <ListItem>
                Es ist <b>nicht leicht für Haustiere</b> von ihren Besitzern getrennt zu sein. Bitte
                ermöglichen Sie es den Besitzern ihr Tier zwischendurch zu sehen
              </ListItem>
              <ListItem>
                Bei Aufnahme eines Tieres müssen Sie sich bei dem zuständigen Veterinäramt melden
                und das <b>Tier registrieren</b>
              </ListItem>
            </UnorderedList>
          </Stack>
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
