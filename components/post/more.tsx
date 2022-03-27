import { Box, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MoreItem = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  return (
    <ListItem onClick={() => router.push('/post')}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: useColorModeValue('gray.100', 'gray.900') }}
        textAlign="center"
      >
        <Box p="6">
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            {t('posts.more')}
          </Text>
        </Box>
      </Box>
    </ListItem>
  )
}

export default MoreItem
