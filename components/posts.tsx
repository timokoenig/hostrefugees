import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Post } from '@prisma/client'
import parse from 'html-react-parser'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MoreItem from './post/more'

type Props = {
  posts: Post[]
}

const Posts = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const hoverColor = useColorModeValue('gray.100', 'gray.900')

  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} spacing={8}>
        <Box mb="5" textAlign="center">
          <Center mb="5">
            <Image src="/svg/undraw_taking_notes_re_bnaf.svg" maxWidth="200" />
          </Center>
          <Heading mb="2">{t('posts')}</Heading>
          <Center>
            <Text
              textAlign="center"
              color={useColorModeValue('gray.600', 'gray.400')}
              maxWidth="md"
            >
              {t('posts.info')}
            </Text>
          </Center>
        </Box>
        <Stack spacing={6}>
          <List spacing="2">
            {props.posts.length == 0 && (
              <Text textAlign="center" p="10" fontWeight="semibold">
                {t('posts.empty')}
              </Text>
            )}
            {props.posts.map((post, i) => (
              <ListItem key={i} onClick={() => router.push(`/post?id=${post.id}`)}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  padding="4"
                  _hover={{ background: hoverColor }}
                >
                  <Box display="flex" alignItems="baseline">
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                    >
                      {[post.addressCity, moment(post.createdAt).format('DD.MM.YYYY')]
                        .filter(Boolean)
                        .join(parse(' &bull; ') as string)}
                    </Box>
                  </Box>
                  <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {post.title}
                  </Text>
                </Box>
              </ListItem>
            ))}
            {props.posts.length > 0 && <MoreItem />}
          </List>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

export default Posts
