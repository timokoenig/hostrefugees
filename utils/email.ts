import { Place, Request, User } from '@prisma/client'
import { MessageHeaders, SMTPClient } from 'emailjs'

const client = new SMTPClient({
  user: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: true,
})

export const emailNewRequest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  return {
    text: `Thank you`, // TODO add content
    from: `${request.author.firstname} <${request.author.email}>`,
    to: `${request.place.author.firstname} <${request.place.author.email}>`,
    subject: `New Stay Request - ${request.place.title}`,
    attachment: [{ data: '<html><b>thank you</b></html>', alternative: true }],
  }
}

export const sendEmail = async (msg: MessageHeaders) => {
  try {
    await client.sendAsync(msg)
  } catch (err: unknown) {
    console.error(err)
  }
}
