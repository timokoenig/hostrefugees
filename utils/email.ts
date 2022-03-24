/* eslint-disable import/order */
import { Place, Request, User } from '@prisma/client'
import { MessageHeaders, SMTPClient } from 'emailjs'
import fs from 'fs'
import path from 'path'

const emailPath = path.resolve('utils/email-template.html')

const client = new SMTPClient({
  user: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: true,
})

const titleAndParagraph = (title: string, text: string): string => {
  return `<tr>
  <td style="padding:30px;background-color:#ffffff;">
    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">${title}</h1>
    <p style="margin:0;">${text}</p>
  </td>
</tr>`
}

const link = (text: string, href: string): string => {
  return `<a href="${href}" style="color:#015abb;text-decoration:underline;">${text}</a>`
}

const paragraph = (text: string): string => {
  return `<tr><td style="padding:30px;background-color:#ffffff;"><p style="margin:0;">${text}</p></td></tr>`
}

const button = (text: string, href: string): string => {
  return `<tr>
  <td style="padding:30px;font-size:16px;text-align:center;line-height:22px;font-weight:bold;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
    <p style="margin:0;"><a href="${href}" style="background: #015abb; text-decoration: none; padding: 10px 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#015abb"><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">${text}</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
  </td>
</tr>`
}

const footer = (): string => {
  return `<a href="https://hostrefugees.eu" style="color:#cccccc;text-decoration:underline;font-weight:bold;">hostrefugees.eu</a><br>provided by
  <br>${process.env.NEXT_PUBLIC_CONTACT_NAME}, ${process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
  <br>${process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY}, ${process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY}`
}

export const emailApprovedUser = (user: User): MessageHeaders => {
  const subject = 'You have been approved'
  const textHtml = [
    titleAndParagraph(
      'You have been approved',
      `You can now offer places on ${link('HostRefugees.eu', 'https://hostrefugees.eu')}`
    ),
    button('Add new place', 'https://hostrefugees.eu/dashboard/place/new'),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${user.firstname} <${user.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const emailNewRequest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `New Stay Request - ${request.place.title}`
  const textHtml = [
    titleAndParagraph('New Stay Request', 'You have a new stay request for one of your places'),
    button('Show Request', 'https://hostrefugees.eu/dashboard'),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.place.author.firstname} <${request.place.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const emailAcceptRequestGuest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `Stay Request Accepted - ${request.place.title}`
  const textHtml = [
    titleAndParagraph('Stay Request Accepted', 'Your stay request has been accepted.'),
    paragraph(
      `Please get in touch with <b>${request.place.author.firstname} ${request.place.author.lastname}</b>`
    ),
    paragraph(
      `Email: ${request.place.author.email}<br>Phone: ${request.place.phoneNumber}<br><br>Arrival Instructions:<br>${request.place.arrivalInstructions}`
    ),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.author.firstname} <${request.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const emailAcceptRequestHost = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `Stay Request Accepted - ${request.place.title}`
  const textHtml = [
    titleAndParagraph('Stay Request Accepted', 'You accepted a stay request.'),
    paragraph(
      `Please get in touch with <b>${request.author.firstname} ${request.author.lastname}</b>`
    ),
    paragraph(`Email: ${request.author.email}<br>Phone: ${request.phoneNumber}`),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.place.author.firstname} <${request.place.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const emailDeclineRequest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `Stay Request Declined - ${request.place.title}`
  const textHtml = [
    titleAndParagraph(
      'Stay Request Declined',
      'We are sorry but your stay request has been declined.'
    ),
    button('Look for other places', 'https://hostrefugees.eu/place'),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.author.firstname} <${request.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const emailCancelRequest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `Stay Request Canceled - ${request.place.title}`
  const textHtml = [
    titleAndParagraph('Stay Request Canceled', 'The guest canceled a stay request for your place.'),
  ].join('')

  let content = fs.readFileSync(emailPath, 'utf-8')
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text: '',
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.place.author.firstname} <${request.place.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const sendEmail = async (msg: MessageHeaders) => {
  if (process.env.EMAIL_ENABLE != 'true') return
  try {
    await client.sendAsync(msg)
  } catch (err: unknown) {
    console.error(err)
  }
}
