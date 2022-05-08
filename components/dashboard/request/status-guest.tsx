import { Link, Text } from '@chakra-ui/react'
import { RequestStatus } from '@prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Status from './status'

type Props = {
  status: RequestStatus | null
  onCancelRequest: () => void
}

const StatusGuest = (props: Props): JSX.Element => {
  const { t } = useTranslation('common')
  switch (props.status) {
    case RequestStatus.ACCEPTED:
      return (
        <Status color="green.500" title={t('accepted').toUpperCase()}>
          <Text fontSize="sm">{t('request.status.guest.accepted')}</Text>
        </Status>
      )
    case RequestStatus.DECLINED:
      return (
        <Status color="red.500" title={t('declined').toUpperCase()}>
          <Text fontSize="sm">{t('request.status.guest.declined')}</Text>
        </Status>
      )
    case RequestStatus.CANCELED:
      return (
        <Status color="gray.500" title={t('canceled').toUpperCase()}>
          <Text fontSize="sm">{t('request.status.guest.canceled')}</Text>
        </Status>
      )
    default:
      return (
        <Status color="yellow.500" title={t('waiting').toUpperCase()}>
          <Text fontSize="sm" mb="2">
            {t('request.status.guest.waiting')}
          </Text>
          <Link fontSize="sm" fontWeight="semibold" onClick={props.onCancelRequest}>
            {t('request.status.guest.waiting.button')}
          </Link>
        </Status>
      )
  }
}

export default StatusGuest
