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
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import HostSelectionButton from './host-selection-button'

type Props = {
  onContinue: () => void
}

const HostSelection = (props: Props) => {
  const { t } = useTranslation('common')
  const [isPeopleSelected, setPeopleSelected] = useState<boolean>(true)
  return (
    <Stack spacing="10">
      <Center>
        <Text textAlign="center" maxW="520px">
          <b>{t('becomehost.info.title')}</b>
          <br />
          {t('becomehost.info.subtitle')}
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
            <Heading size="md">{t('becomehost.people.title')}</Heading>
            <UnorderedList pl="5">
              <ListItem>{parse(t('becomehost.people.1'))}</ListItem>
              <ListItem>{parse(t('becomehost.people.2'))}</ListItem>
              <ListItem>{parse(t('becomehost.people.3'))}</ListItem>
              <ListItem>{parse(t('becomehost.people.4'))}</ListItem>
              <ListItem>
                {parse(t('becomehost.people.5'))}{' '}
                <Trans t={t} i18nKey="becomehost.people.5.1">
                  Schauen Sie auf unserem
                  <Link href="/post" color="blue.500">
                    Schwarzen Brett
                  </Link>
                  oder informieren Sie sich direkt bei Ihrer Versicherung
                </Trans>
              </ListItem>
            </UnorderedList>
          </Stack>
        </Center>
      ) : (
        <Center>
          <Stack textAlign="left" maxW="520px">
            <Heading size="md">{t('becomehost.pets.title')}</Heading>

            <UnorderedList pl="5">
              <ListItem>{parse(t('becomehost.pets.1'))}</ListItem>
              <ListItem>
                {parse(t('becomehost.pets.2'))}
                <Text as="span" color="red.500">
                  ♥️
                </Text>
              </ListItem>
              <ListItem>{parse(t('becomehost.pets.3'))}</ListItem>
              <ListItem>
                {parse(t('becomehost.pets.4'))}:
                <List>
                  <ListItem>- {parse(t('becomehost.pets.4.1'))}</ListItem>
                  <ListItem>- {parse(t('becomehost.pets.4.2'))}</ListItem>
                  <ListItem>- {parse(t('becomehost.pets.4.3'))}</ListItem>
                  <ListItem>- {parse(t('becomehost.pets.4.4'))}</ListItem>
                </List>
                {parse(t('becomehost.pets.4.info'))}
              </ListItem>
              <ListItem>{parse(t('becomehost.pets.5'))}</ListItem>
              <ListItem>{parse(t('becomehost.pets.6'))}</ListItem>
              <ListItem>{parse(t('becomehost.pets.7'))}</ListItem>
            </UnorderedList>
          </Stack>
        </Center>
      )}
      <Center>
        <Button colorScheme="blue" size="lg" onClick={props.onContinue}>
          {t('becomehost.continue')}
        </Button>
      </Center>
    </Stack>
  )
}

export default HostSelection
