/* eslint-disable import/order */
import { Place, Request, User } from '@prisma/client'
import { MessageHeaders, SMTPClient } from 'emailjs'
import fs from 'fs'
import path from 'path'
import i18n from 'utils/i18next'

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
  <br>${process.env.CONTACT_NAME}, ${process.env.CONTACT_ADDRESS}
  <br>${process.env.CONTACT_ADDRESS_CITY}, ${process.env.CONTACT_ADDRESS_COUNTRY}`
}

const translation = (user: User, key: string): string => {
  let language = 'en'
  if (user.languages.includes('pl')) {
    language = 'pl'
  }
  if (user.languages.includes('ru')) {
    language = 'ru'
  }
  if (user.languages.includes('ua')) {
    language = 'ua'
  }
  if (user.languages.includes('en')) {
    language = 'en'
  }
  if (user.languages.includes('de')) {
    language = 'de'
  }
  return i18n.t(key, { ns: 'common', lng: language })
}

export const emailPasswordReset = (user: User, hash: string): MessageHeaders => {
  const subject = `HostRefugees - ${translation(user, 'email.password.reset')}`
  const textHtml = [
    titleAndParagraph(
      translation(user, 'email.password.reset'),
      translation(user, 'email.password.message')
    ),
    button(
      translation(user, 'email.password.button'),
      `https://hostrefugees.eu/reset-password?hash=${hash}`
    ),
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

export const emailApprovedUser = (user: User): MessageHeaders => {
  const subject = translation(user, 'email.approved')
  const textHtml = [
    titleAndParagraph(
      translation(user, 'email.approved'),
      translation(user, 'email.approved.message').replace(
        '{{link}}',
        link('HostRefugees.eu', 'https://hostrefugees.eu')
      )
    ),
    button(
      translation(user, 'email.approved.button'),
      'https://hostrefugees.eu/dashboard/place/new'
    ),
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
  const subject = `${translation(request.place.author, 'email.stayrequest')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.place.author, 'email.stayrequest'),
      translation(request.place.author, 'email.stayrequest.message')
    ),
    button(
      translation(request.place.author, 'email.stayrequest.button'),
      'https://hostrefugees.eu/dashboard'
    ),
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
  const subject = `${translation(request.author, 'email.stayrequest.accepted.guest')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.author, 'email.stayrequest.accepted.guest'),
      translation(request.author, 'email.stayrequest.accepted.guest.message')
    ),
    paragraph(
      translation(request.author, 'email.stayrequest.accepted.guest.message.name').replace(
        '{{name}}',
        `${request.place.author.firstname} ${request.place.author.lastname}`
      )
    ),
    paragraph(
      `${translation(request.author, 'email')}: ${request.place.author.email}<br>${translation(
        request.author,
        'phone'
      )}: ${request.place.phoneNumber}<br><br>${translation(
        request.author,
        'dashboard.place.arrival'
      )}:<br>${request.place.arrivalInstructions}`
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
  const subject = `${translation(request.place.author, 'email.stayrequest.accepted.host')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.place.author, 'email.stayrequest.accepted.host'),
      translation(request.place.author, 'email.stayrequest.accepted.host.message')
    ),
    paragraph(
      translation(request.place.author, 'email.stayrequest.accepted.host').replace(
        '{{name}}',
        `${request.author.firstname} ${request.author.lastname}`
      )
    ),
    paragraph(
      `${translation(request.place.author, 'email')}: ${request.author.email}<br>${translation(
        request.place.author,
        'phone'
      )}: ${request.phoneNumber}`
    ),
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
  const subject = `${translation(request.author, 'email.stayrequest.declined')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.author, 'email.stayrequest.declined'),
      translation(request.author, 'email.stayrequest.declined.message')
    ),
    request.message
      ? paragraph(
          `${translation(request.author, 'email.stayrequest.declined.message.host')}:<br>${
            request.message
          }`
        )
      : '',
    button(
      translation(request.author, 'email.stayrequest.declined.button'),
      'https://hostrefugees.eu/place'
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

export const emailCancelRequest = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `${translation(request.place.author, 'email.stayrequest.canceled')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.place.author, 'email.stayrequest.canceled'),
      translation(request.place.author, 'email.stayrequest.canceled.message')
    ),
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

export const emailRequestReminder = (
  request: Request & { place: Place & { author: User }; author: User }
): MessageHeaders => {
  const subject = `${translation(request.place.author, 'email.stayrequest.reminder')} - ${
    request.place.title
  }`
  const textHtml = [
    titleAndParagraph(
      translation(request.place.author, 'email.stayrequest.reminder'),
      translation(request.place.author, 'email.stayrequest.reminder.message')
    ),
    button(
      translation(request.place.author, 'email.stayrequest.reminder.button'),
      `https://hostrefugees.eu/dashboard/request/${request.id}`
    ),
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
