import { Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MappedPlace } from 'utils/models'
import Status from '../dashboard/request/status'

type Props = {
  place: MappedPlace
}

const ReservationStatus = (props: Props): JSX.Element | null => {
  const { t } = useTranslation('common')
  if (!props.place.reserved) return null
  return (
    <Status color="yellow.500" title={t('reserved').toUpperCase()}>
      <Text>{t('place.detail.reserved')}</Text>
    </Status>
  )
}

export default ReservationStatus
