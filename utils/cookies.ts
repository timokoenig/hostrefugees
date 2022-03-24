/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import cookieCutter from 'cookie-cutter'
import moment from 'moment'

export const COOKIE_CONSENT = 'cookie-consent'

export const setCookie = (name: string, value: string) => {
  cookieCutter.set(name, value, {
    path: '/',
    expires: moment().add(1, 'year').toDate().toUTCString(),
  })
}

export const getCookie = (name: string): string | null | undefined => {
  return cookieCutter.get(name)
}
