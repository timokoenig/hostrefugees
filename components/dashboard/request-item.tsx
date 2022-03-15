import { Badge, Box, ListItem } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

const RequestItem = () => {
  const router = useRouter()
  const property = {
    adults: 3,
    children: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    date: new Date(),
  }

  return (
    <ListItem onClick={() => router.push(`/dashboard/request/${'1'}`)}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {moment(property.date).format('DD.MM.YYYY HH:mm')}{' '}
              <Badge colorScheme="green" borderRadius="full" px="2" ml="2">
                Accepted
              </Badge>
              <Badge colorScheme="red" borderRadius="full" px="2" ml="2">
                Declined
              </Badge>
              <Badge colorScheme="yellow" borderRadius="full" px="2" ml="2">
                Waiting
              </Badge>
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {property.title}
          </Box>
          <Box>
            {property.adults} adults &bull; {property.children} children
          </Box>
        </Box>
      </Box>
    </ListItem>
  )
}

export default RequestItem
