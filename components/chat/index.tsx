import { Box, Button, Flex, List, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollButton from './scroll-button'

type Props = {
  children: JSX.Element[]
  chatEnabled: boolean
}

const Chat = (props: Props) => {
  const { t } = useTranslation('common')
  const listRef = useRef<HTMLUListElement>(null)
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
    // setItems([...items, message])
    setMessage('')
    setTimeout(() => {
      scrollToBottom(false)
    }, 100)
  }

  useEffect(() => {
    scrollToBottom(false)
  }, [props.children])

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="10"
      overflow="hidden"
      p="2"
      mb="5"
    >
      <List
        ref={listRef}
        maxHeight="500px"
        overflowY="scroll"
        overflowX="hidden"
        px="2"
        mb="5"
        onScroll={onScroll}
      >
        {props.children}
        {showScrollButton && <ScrollButton onClick={() => scrollToBottom(true)} />}
      </List>
      {props.chatEnabled && (
        <Flex flexDirection="row">
          <Textarea
            placeholder={t('send.message')}
            mr="2"
            rows={1}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button isDisabled={message.trim() == ''} onClick={onSend}>
            {t('send')}
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default Chat
