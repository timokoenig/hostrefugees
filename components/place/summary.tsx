import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const Summary = () => {
  const property = {
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        rounded="md"
        alt="product image"
        src="https://picsum.photos/900/600"
        fit="cover"
        align="center"
        w="100%"
        h={{ base: '100%', sm: '400px', lg: '500px' }}
      />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
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
  )
}

export default Summary
