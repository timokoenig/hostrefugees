export enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
  Host = 'host',
}

export type User = {
  id: string
  firstname: string
  lastname?: string
  password: string
  email: string
  role: UserRole
}
