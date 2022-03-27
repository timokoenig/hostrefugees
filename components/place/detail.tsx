import {
  Box,
  Button,
  Container,
  GridItem,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { BathroomType, Request } from '@prisma/client'
import CustomButton from 'components/common/button'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatAvailability, formatPlaceType } from 'utils/formatter'
import { MappedPlace } from 'utils/models'
import Status from '../dashboard/request/status'

type Props = {
  place: MappedPlace
  request: Request | null
  enableRequest: boolean
}

export default function Detail(props: Props) {
  const { t } = useTranslation('common')
  const { t: tLang } = useTranslation('languages')
  const router = useRouter()
  const titleColor = useColorModeValue('blue.500', 'blue.300')
  const [place, setPlace] = useState<MappedPlace>(props.place)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onTranslate = async () => {
    setLoading(true)
    const res = await fetch(`/api/place/${place.id}/translate`)
    if (res.ok && res.body != null) {
      const json = (await res.json()) as MappedPlace
      setPlace(json)
    }
    setLoading(false)
  }

  const RequestButton = (): JSX.Element | null => {
    if (props.request != null) {
      return (
        <Status color="yellow.500" title="WAITING">
          <Text mb="2">{t('place.detail.existingrequest')}</Text>
          <Link fontWeight="semibold" href={`/dashboard/request/${props.request.id}`}>
            {t('place.detail.show')}
          </Link>
        </Status>
      )
    }
    if (props.enableRequest) {
      return (
        <CustomButton
          fullWidth
          title={t('place.detail.request')}
          onClick={() => router.push(`/place/${place.id}/request`)}
        />
      )
    }
    return null
  }

  return (
    <Container maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <SimpleGrid columns={2} spacing="5">
          {place.photos.length == 0 ? (
            <Box rounded="md" backgroundColor="gray" w="100%" h="100%" />
          ) : (
            place.photos.map((photo, i) => (
              <GridItem key={i} colSpan={i == 0 ? 2 : 1}>
                <Image
                  rounded="md"
                  alt="place image"
                  src={`/api/place/${place.id}/photo/${photo}`}
                  fit="cover"
                  align="center"
                  w="100%"
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
              </GridItem>
            ))
          )}
        </SimpleGrid>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {place.title}{' '}
              <Button size="xs" onClick={onTranslate} isDisabled={isLoading}>
                Translate to Ukrainian
              </Button>
            </Heading>
            <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize="2xl">
              {formatAvailability(place)}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            <Text fontSize="lg">{place.description}</Text>
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

              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('adults')}
                  </Text>{' '}
                  {place.placeAdults} (
                  {place.placeAdultWomen && place.placeAdultMen
                    ? t('womenmen')
                    : place.placeAdultMen
                    ? t('onlymen')
                    : t('onlywomen')}
                  )
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('children')}
                  </Text>{' '}
                  {place.placeChildren}
                </ListItem>
              </List>
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
                    {t('place.detail.type')}
                  </Text>{' '}
                  {formatPlaceType(place)}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('rooms')}:
                  </Text>{' '}
                  {place.rooms}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('Beds')}:
                  </Text>{' '}
                  {place.beds}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('bathroom')}:
                  </Text>{' '}
                  {place.bathroom == BathroomType.YES
                    ? t('bathroom.private')
                    : t('bathroom.shared')}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('adults')}:
                  </Text>{' '}
                  {place.adults}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('children')}:
                  </Text>{' '}
                  {place.children}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('place.detail.pets')}:
                  </Text>{' '}
                  {place.pets ? 'Yes' : 'No'}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('address')}:
                  </Text>{' '}
                  {place.addressCity} ({t('place.detail.address.info')})
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    {t('languages.host')}:
                  </Text>{' '}
                  {place.author.languages.map(lang => tLang(lang)).join(', ')}
                </ListItem>
              </List>
            </Box>
            {place.houseRules !== '' && (
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
                <Text fontSize="lg">{place.houseRules}</Text>
              </Box>
            )}
          </Stack>

          <RequestButton />
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
