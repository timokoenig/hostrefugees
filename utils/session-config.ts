export const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'hostrefugees-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
