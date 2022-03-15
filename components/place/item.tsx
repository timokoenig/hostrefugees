import { Badge, Box, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const PlaceItem = () => {
  const router = useRouter()
  const property = {
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
  }

  return (
    <ListItem onClick={() => router.push(`/place/${'1'}`)}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{ background: 'gray.100' }}
      >
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {property.title}
          </Box>
          <Box>Available Now</Box>
        </Box>
      </Box>
    </ListItem>
  )
}

export default PlaceItem
