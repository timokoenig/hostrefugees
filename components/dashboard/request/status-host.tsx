import { GridItem, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import { RequestStatus } from '@prisma/client'
import parse from 'html-react-parser'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../common/button'
import DeclineModal from './decline-modal'
import Status from './status'

type Props = {
  status: RequestStatus | null
  onAccept: () => void
  onDecline: (message: string | null) => void
}

const StatusHost = (props: Props): JSX.Element => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onCloseDeclineModal = (confirm: boolean, message: string | null) => {
    onClose()
    if (!confirm) return
    props.onDecline(message)
  }

  switch (props.status) {
    case RequestStatus.ACCEPTED:
      return (
        <Status color="green.500" title={t('accepted').toUpperCase()}>
          <Text>{parse(t('request.status.host.accepted'))}</Text>
        </Status>
      )
    case RequestStatus.DECLINED:
      return (
        <Status color="red.500" title={t('declined').toUpperCase()}>
          <Text>{t('request.status.host.declined')}</Text>
        </Status>
      )
    case RequestStatus.CANCELED:
      return (
        <Status color="gray.500" title={t('canceled').toUpperCase()}>
          <Text>{t('request.status.host.canceled')}</Text>
        </Status>
      )
    default:
      return (
        <>
          <SimpleGrid columns={3} spacing={5}>
            <GridItem>
              <Button title={t('decline')} color="red.500" fullWidth onClick={onOpen} />
            </GridItem>
            <GridItem colSpan={2}>
              <Button title={t('accept')} color="green.500" fullWidth onClick={props.onAccept} />
            </GridItem>
          </SimpleGrid>
          <DeclineModal isOpen={isOpen} onClose={onCloseDeclineModal} />
        </>
      )
  }
}

export default StatusHost
