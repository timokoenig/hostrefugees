import { Box, ListItem, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const MoreItem = () => {
  const router = useRouter()
  return (
    <ListItem onClick={() => router.push('/place')}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
        textAlign="center"
      >
        <Box p="6">
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            See More Places
          </Text>
        </Box>
      </Box>
    </ListItem>
  )
}

export default MoreItem
