/* eslint-disable import/order */
import { Place, Request, User } from '@prisma/client'
import { MessageHeaders, SMTPClient } from 'emailjs'
import fs from 'fs'

const client = new SMTPClient({
  user: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  ssl: true,
})

const paragraph = (text: string): string => {
  return `<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">${text}</p>`
}

const button = (text: string, link: string): string => {
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
  <tbody>
    <tr>
      <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
          <tbody>
            <tr>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #3498db;" valign="top" align="center" bgcolor="#3498db"> <a href="${link}" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">${text}</a> </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`
}

const footer = (): string => {
  return `<br> provided by
  <br> ${process.env.NEXT_PUBLIC_CONTACT_NAME}, ${process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
  <br> ${process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY}, ${process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY}`
}

export const emailApprovedUser = (user: User): MessageHeaders => {
  const subject = `You have been approved`
  const preheader = 'You have been approved for hosting on HostRefugees.eu'
  const text = ''
  const textHtml = [
    paragraph('You have been approved for hosting on HostRefugees.eu'),
    button('Add new Place', 'https://hostrefugees.eu/dashboard/place/new'),
  ].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
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
  const preheader = 'You have a new stay request for one of your places'
  const text = ''
  const textHtml = [
    paragraph('You have a new stay request for one of your places'),
    button('Show Request', 'https://hostrefugees.eu/dashboard'),
  ].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
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
  const preheader = 'Your stay request has been accepted'
  const text = ''
  const textHtml = [
    paragraph('Your stay request has been accepted.'),
    paragraph(
      `Please get in touch with <b>${request.place.author.firstname} ${request.place.author.lastname}</b>`
    ),
    paragraph(`Email: xxx`),
    paragraph(`Phone: xxx`),
  ].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
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
  const preheader = 'You accepted a stay request'
  const text = ''
  const textHtml = [
    paragraph('You accepted a stay request.'),
    paragraph(
      `Please get in touch with <b>${request.author.firstname} ${request.author.lastname}</b>`
    ),
    paragraph(`Email: xxx`),
    paragraph(`Phone: xxx`),
  ].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
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
  const preheader = 'Your stay request has been declined'
  const text = ''
  const textHtml = [
    paragraph('Your stay request has been declined.'),
    button('Show Other Places', 'https://hostrefugees.eu/place'),
  ].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
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
  const preheader = 'A stay request has been canceled'
  const text = ''
  const textHtml = [paragraph('The guest canceld a stay request at your place.')].join('')

  let content = fs.readFileSync('./email-template.html', 'utf-8')
  content = content.replace('{{TITLE}}', subject)
  content = content.replace('{{PREHEADER}}', preheader)
  content = content.replace('{{BODY}}', textHtml)
  content = content.replace('{{FOOTER}}', footer())

  return {
    text,
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_EMAIL}>`,
    to: `${request.place.author.firstname} <${request.place.author.email}>`,
    subject,
    attachment: [{ data: content, alternative: true }],
  }
}

export const sendEmail = async (msg: MessageHeaders) => {
  if (process.env.EMAIL_ENABLE !== 'true') return
  try {
    await client.sendAsync(msg)
  } catch (err: unknown) {
    console.error(err)
  }
}
