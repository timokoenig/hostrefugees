/* eslint-disable react-hooks/exhaustive-deps */
import { ListItem, useDisclosure, useToast } from '@chakra-ui/react'
import { Message, Place, Request, RequestStatus, User, UserRole } from '@prisma/client'
import DeclineModal from 'components/dashboard/request/decline-modal'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MappedUser } from 'utils/models'
import showTranslation from 'utils/show-translation'
import Chat from '.'
import ChatBubble from './bubble'
import ChatBubbleDate from './bubble-date'
import ChatBubbleInfo from './bubble-info'
import ChatBubbleStatus from './bubble-status'

type Props = {
  request: Request & { place: Place & { author: User }; author: User }
  user: MappedUser
  messages: Message[]
}

type Items = {
  [key: string]: JSX.Element
}

const groupItems = (allItems: Items): JSX.Element[] => {
  if (Object.keys(allItems).length == 0) return []

  const tmpItems: JSX.Element[] = []
  const sortedKeys: moment.Moment[] = Object.keys(allItems)
    .map(key => moment(key))
    .sort((a, b) => a.unix() - b.unix())

  let currentDate = sortedKeys[0]
  tmpItems.push(<ChatBubbleDate date={sortedKeys[0].toDate()} />)

  for (const key of sortedKeys) {
    if (key.format('DD.MM.YYYY') != currentDate.format('DD.MM.YYYY')) {
      tmpItems.push(<ChatBubbleDate date={key.toDate()} />)
      currentDate = key
    }
    tmpItems.push(allItems[key.toDate().toISOString()])
  }

  return tmpItems
}

const RequestChat = (props: Props) => {
  const router = useRouter()
  const toast = useToast()
  const [items, setItems] = useState<JSX.Element[]>([])
  const [messages, setMessages] = useState<Message[]>(props.messages)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const updateRequestStatus = async (status: RequestStatus, message: string | null) => {
    try {
      const res = await fetch(`/api/request/${props.request.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          message,
        }),
      })
      if (res.ok) {
        router.reload()
      } else {
        throw new Error(res.statusText)
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const onCloseDeclineModal = async (confirm: boolean, message: string | null) => {
    onClose()
    if (!confirm) return
    await updateRequestStatus(RequestStatus.DECLINED, message)
  }

  const reloadItems = (msgs: Message[]) => {
    const tmpItems: Items = {}
    tmpItems[props.request.createdAt.toISOString()] = (
      <ChatBubbleInfo
        request={props.request}
        user={props.user}
        onAccept={() => updateRequestStatus(RequestStatus.ACCEPTED, null)}
        onDecline={onOpen}
      />
    )
    if (
      (props.request.status == null && props.user.role == UserRole.GUEST) ||
      props.request.status != null
    ) {
      tmpItems[props.request.updatedAt.toISOString()] = (
        <ChatBubbleStatus
          request={props.request}
          user={props.user}
          onCancel={() => updateRequestStatus(RequestStatus.CANCELED, null)}
        />
      )
    }
    if (props.request.status == RequestStatus.DECLINED && props.request.message != null) {
      tmpItems[moment(props.request.updatedAt).add(1, 'minute').toISOString()] = (
        <ChatBubble position="right">
          {showTranslation(props.request.message, props.request.messageTranslation)}
        </ChatBubble>
      )
    }
    for (const msg of msgs) {
      tmpItems[moment(msg.createdAt).toISOString()] = (
        <ChatBubble position={msg.authorId == props.user.id ? 'right' : 'left'}>
          {showTranslation(msg.message, msg.messageTranslation)}
        </ChatBubble>
      )
    }
    setItems(groupItems(tmpItems))
  }

  const onNewMessage = async (message: string) => {
    try {
      const res = await fetch(`/api/request/${props.request.id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      })
      if (res.ok) {
        router.reload()
      } else {
        throw new Error(res.statusText)
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const refreshMessages = async () => {
    try {
      const res = await fetch(`/api/request/${props.request.id}/message`)
      if (res.ok) {
        const newMessages = (await res.json()) as Message[]
        const oldMessageIds = messages.map(msg => msg.id)
        const diff = newMessages.map(msg => msg.id).filter(item => !oldMessageIds.includes(item))
        if (diff.length == 0) return
        setMessages(newMessages)
        reloadItems(newMessages)
      } else {
        throw new Error(res.statusText)
      }
    } catch {
      toast({
        title: 'Request failed',
        description: 'Please try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    setMessages(props.messages)
    reloadItems(props.messages)

    if (props.request.status == null || props.request.status == RequestStatus.ACCEPTED) {
      // Only activate refresh interval for new or accepted requests
      const interval = 10 // seconds
      const intervalId = setInterval(async () => {
        await refreshMessages()
      }, interval * 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [props])

  return (
    <>
      <Chat
        chatEnabled={
          props.request.status != RequestStatus.CANCELED &&
          props.request.status != RequestStatus.DECLINED
        }
        user={props.user}
        translationEnabledSender={props.user.messageTranslation}
        translationEnabledRecipient={
          props.user.role == UserRole.GUEST
            ? props.request.place.author.messageTranslation
            : props.request.author.messageTranslation
        }
        onMessage={onNewMessage}
      >
        {items.map((item, key) => (
          <ListItem key={key}>{item}</ListItem>
        ))}
      </Chat>
      <DeclineModal isOpen={isOpen} onClose={onCloseDeclineModal} />
    </>
  )
}

export default RequestChat
