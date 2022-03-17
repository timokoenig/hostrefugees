import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Input } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import DayPicker from 'react-day-picker/DayPicker'
import 'react-day-picker/lib/style.css'

type Props = {
  value: Date | null
  onChange: (date: Date | null) => void
  onReset?: () => void
}

const DatePicker = (props: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const onChange = (date: Date) => {
    if (!moment(date).isValid()) {
      props.onChange(null)
      return
    }
    props.onChange(date)
    setOpen(false)
  }

  const onReset = () => {
    if (props.onReset) {
      props.onReset()
    }
    setOpen(false)
  }

  return (
    <Box position="relative">
      <Input
        type="text"
        value={props.value ? moment(props.value).format('DD.MM.YYYY') : ''}
        onClick={() => setOpen(!isOpen)}
      />
      {props.onReset && props.value !== null && (
        <Button
          backgroundColor="gray.300"
          size="xs"
          position="absolute"
          right="2"
          top="2"
          borderRadius="full"
          onClick={onReset}
        >
          <CloseIcon width="2" height="2" />
        </Button>
      )}
      {isOpen && <DayPicker selectedDays={props.value ?? undefined} onDayClick={onChange} />}
    </Box>
  )
}

export default DatePicker
