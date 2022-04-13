/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Badge } from '@chakra-ui/react'
import { PostCategory } from '@prisma/client'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Category = (props: { category: PostCategory }) => {
  const { t } = useTranslation('common')
  let color = 'gray'
  switch (props.category) {
    case PostCategory.EDUCATION:
      color = 'purple'
      break
    case PostCategory.HELP:
      color = 'yellow'
      break
    case PostCategory.KIDS:
      color = 'red'
      break
    case PostCategory.OUTDOOR:
      color = 'green'
      break
    case PostCategory.SPORT:
      color = 'blue'
      break
    case PostCategory.INSURANCE:
      color = 'cyan'
      break
    default:
      break
  }
  return (
    <Badge colorScheme={color} mr="2">
      {t(props.category.toLowerCase())}
    </Badge>
  )
}

export default Category
