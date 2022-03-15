import { Box, Stack, Text } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import React from 'react'

const AnyReactComponent = ({ lat, lng }: { lat: number; lng: number }) => (
  <Box lat={lat} lng={lng} textAlign="center">
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
    >
      <Text color="white" fontSize="lg" fontWeight="bold" height="100%" lineHeight="8">
        1
      </Text>
    </Box>
    <Box backgroundColor="blue.500" width="10" height="10" borderRadius="20" opacity="0.5" />
  </Box>
)

export default function Map() {
  return (
    <Stack height="80vh">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{ lat: 53.551086, lng: 9.993682 }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={53.551086} lng={9.993682} />
      </GoogleMapReact>
    </Stack>
  )
}
