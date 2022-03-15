import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const Create = () => {
  return (
    <Box mb="5">
      <FormControl mb="5">
        <FormLabel htmlFor="firstname">First Name</FormLabel>
        <Input
          id="firstname"
          type="firstname"
          value={'firstname'}
          isDisabled={true}
          onChange={_ => {}}
        />
      </FormControl>
    </Box>
  )
}

export default Create
