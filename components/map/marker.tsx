import { Box, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  lat: string
  lng: string
  onClick?: () => void
}

const Marker = (props: Props) => (
  <Box lat={props.lat} lng={props.lng} textAlign="center">
    <Box
      backgroundColor="blue.500"
      width="8"
      height="8"
      borderRadius="20"
      position="absolute"
      zIndex="1"
      mt="1"
      ml="1"
      cursor="pointer"
      _hover={{
        background: 'blue.400',
      }}
      _active={{
        background: 'blue.600',
      }}
      onClick={props.onClick}
    >
      <Text color="white" fontSize="lg" fontWeight="bold" height="100%" lineHeight="8">
        {props.title}
      </Text>
    </Box>
    <Box backgroundColor="blue.500" width="10" height="10" borderRadius="20" opacity="0.5" />
  </Box>
)

export default Marker
