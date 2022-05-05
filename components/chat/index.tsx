import { Box, Button, Flex, Input, List } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChatBubble from './bubble'
import ChatBubbleDate from './bubble-date'
import ChatBubbleInfo from './bubble-info'

type Props = {
  items: string[]
}

const Chat = (props: Props) => {
  const { t } = useTranslation('common')
  const listRef = useRef<HTMLUListElement>(null)
  const [items, setItems] = useState<string[]>(props.items)
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const scrollToBottom = (smooth: boolean) => {
    if (listRef.current == null) return
    if (smooth) {
      listRef.current.style.scrollBehavior = 'smooth'
    }
    listRef.current.scrollTop = listRef.current.scrollHeight
  }

  const onScroll = () => {
    if (listRef.current == null) return
    const shouldHideButton =
      listRef.current.scrollTop + 50 >= listRef.current.scrollHeight - listRef.current.clientHeight
    setShowScrollButton(!shouldHideButton)
  }

  const onSend = () => {
    setItems([...items, message])
    setMessage('')
    setTimeout(() => {
      scrollToBottom(false)
    }, 100)
  }

  useEffect(() => {
    scrollToBottom(false)
  }, [])

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="10"
      overflow="hidden"
      p="2"
    >
      <List
        ref={listRef}
        maxHeight="500px"
        overflow="scroll"
        px="2"
        mb="5"
        pt="10"
        onScroll={onScroll}
      >
        <ChatBubbleDate date={moment().toDate()} />
        <ChatBubbleInfo>Test</ChatBubbleInfo>
        {items.map((item, key) => (
          <ChatBubble key={key} position="left">
            {item}
          </ChatBubble>
        ))}
        {showScrollButton && (
          <Flex width="100%" position="absolute" bottom="20">
            <Button
              colorScheme="blue"
              onClick={() => scrollToBottom(true)}
              marginLeft="auto"
              marginRight="auto"
              size="sm"
            >
              {t('chat.showlatest')}
            </Button>
          </Flex>
        )}
      </List>
      <Flex flexDirection="row">
        <Input
          placeholder={t('send.message')}
          mr="2"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button isDisabled={message.trim() == ''} onClick={onSend}>
          {t('send')}
        </Button>
      </Flex>
    </Box>
  )
}

export default Chat
