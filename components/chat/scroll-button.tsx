import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onClick: () => void
}

const ScrollButton = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Flex width="100%" position="absolute" bottom="20">
      <Button
        colorScheme="blue"
        onClick={props.onClick}
        marginLeft="auto"
        marginRight="auto"
        size="sm"
        transform="translateY(2px)"
        boxShadow="lg"
      >
        {t('chat.showlatest')}
      </Button>
    </Flex>
  )
}

export default ScrollButton
