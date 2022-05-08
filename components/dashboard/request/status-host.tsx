import { Text } from '@chakra-ui/react'
import { RequestStatus } from '@prisma/client'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Status from './status'

type Props = {
  status: RequestStatus | null
}

const StatusHost = (props: Props): JSX.Element | null => {
  const { t } = useTranslation('common')

  switch (props.status) {
    case RequestStatus.ACCEPTED:
      return (
        <Status color="green.500" title={t('accepted').toUpperCase()}>
          <Text fontSize="sm">{parse(t('request.status.host.accepted'))}</Text>
        </Status>
      )
    case RequestStatus.DECLINED:
      return (
        <Status color="red.500" title={t('declined').toUpperCase()}>
          <Text fontSize="sm">{t('request.status.host.declined')}</Text>
        </Status>
      )
    case RequestStatus.CANCELED:
      return (
        <Status color="gray.500" title={t('canceled').toUpperCase()}>
          <Text fontSize="sm">{t('request.status.host.canceled')}</Text>
        </Status>
      )
    default:
      return null
  }
}

export default StatusHost
