import {
  Box,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Request } from '@prisma/client'
import CustomButton from 'components/common/button'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatAvailability } from 'utils/formatter'
import { MappedPlace } from 'utils/models'
import showTranslation from 'utils/show-translation'
import Status from '../dashboard/request/status'
import ReservationStatus from './reservation-status'

type Props = {
  place: MappedPlace
  request: Request | null
  enableRequest: boolean
}

export default function DetailPets(props: Props) {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()

  const RequestButton = (): JSX.Element | null => {
    if (props.request != null) {
      return (
        <Status color="yellow.500" title={t('waiting').toUpperCase()}>
          <Text mb="2">{t('place.detail.existingrequest')}</Text>
          <Link fontWeight="semibold" href={`/dashboard/request/${props.request.id}`}>
            {t('place.detail.show')}
          </Link>
        </Status>
      )
    }
    if (props.place.reserved) {
      return <ReservationStatus place={props.place} />
    }
    if (props.enableRequest) {
      return (
        <CustomButton
          fullWidth
          title={t('place.detail.request')}
          onClick={() => router.push(`/place/${props.place.id}/request`)}
        />
      )
    }
    return null
  }

  return (
    <Stack spacing={{ base: 6, md: 10 }}>
      <Box as="header">
        <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
          {showTranslation(props.place.title, props.place.titleTranslation)}
        </Heading>
        <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize="2xl">
          {formatAvailability(t, props.place)}
        </Text>
      </Box>

      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction="column"
        divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
      >
        <Text fontSize="lg">
          {showTranslation(props.place.description, props.place.descriptionTranslation)}
        </Text>
        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color={useColorModeValue('blue.500', 'blue.300')}
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            {t('place.detail')}
          </Text>

          <List spacing={2}>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('place.detail.pets')}:
              </Text>{' '}
              {props.place.petsNumber}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('place.detail.pets.types')}:
              </Text>{' '}
              {props.place.features.map(f => t(f.toLowerCase())).join(', ')}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('languages.host')}:
              </Text>{' '}
              {props.place.author.languages.map(lang => tLang(lang)).join(', ')}
            </ListItem>
          </List>
        </Box>
      </Stack>

      <RequestButton />
    </Stack>
  )
}
