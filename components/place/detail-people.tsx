import {
  Badge,
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
import { BathroomType, Feature, Request } from '@prisma/client'
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

export default function DetailPeople(props: Props) {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()
  const titleColor = useColorModeValue('blue.500', 'blue.300')

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
            {t('residents')}
          </Text>
          {props.place.placeAdults == 0 && props.place.placeChildren == 0 ? (
            <Text>{t('place.detail.noresidents')}</Text>
          ) : (
            <List spacing={2}>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  {t('adults')}
                </Text>{' '}
                {props.place.placeAdults} (
                {props.place.placeAdultWomen && props.place.placeAdultMen
                  ? t('womenmen')
                  : props.place.placeAdultMen
                  ? t('onlymen')
                  : t('onlywomen')}
                )
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  {t('children')}
                </Text>{' '}
                {props.place.placeChildren}
              </ListItem>
            </List>
          )}
        </Box>
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
                {t('place.detail.type')}:
              </Text>{' '}
              {t(`place.type.${props.place.type.toLowerCase()}`)}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('rooms', { count: props.place.rooms })}:
              </Text>{' '}
              {props.place.rooms}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('beds', { count: props.place.beds })}:
              </Text>{' '}
              {props.place.beds}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('bathroom')}:
              </Text>{' '}
              {props.place.bathroom == BathroomType.YES
                ? t('bathroom.private')
                : t('bathroom.shared')}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('adults')}:
              </Text>{' '}
              {props.place.adults}{' '}
              {props.place.features.includes(Feature.ALLOW_ONLY_WOMEN) ? `(${t('onlywomen')})` : ''}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('children')}:
              </Text>{' '}
              {props.place.children}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('place.detail.pets')}:
              </Text>{' '}
              {t(props.place.pets ? 'yes' : 'no')}
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('address')}:
              </Text>{' '}
              {props.place.addressCity} ({t('place.detail.address.info')})
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {t('languages.host')}:
              </Text>{' '}
              {props.place.author.languages.map(lang => tLang(lang)).join(', ')}
            </ListItem>
            {props.place.author.verified && (
              <ListItem>
                <Badge fontSize="sm" colorScheme="green">
                  {t('verified.host')}
                </Badge>
              </ListItem>
            )}
          </List>
        </Box>
        {props.place.houseRules !== '' && (
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={titleColor}
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              {t('houserules')}
            </Text>
            <Text fontSize="lg">
              {showTranslation(props.place.houseRules, props.place.houseRulesTranslation)}
            </Text>
          </Box>
        )}
      </Stack>

      <RequestButton />
    </Stack>
  )
}
