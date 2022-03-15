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

export enum PlaceType {
  Place = 'place',
  Private = 'private',
  Shared = 'shared',
}

export enum BathroomType {
  Yes = 'yes',
  No = 'no',
  Shared = 'shared',
}

export type Place = {
  id: string
  createdAt: Date
  updatedAt: Date
  author: User
  approved: boolean
  active: boolean
  title: string
  description: string
  type: PlaceType
  rooms: number
  beds: number
  bathroom: BathroomType
  adults: number
  children: number
  addressStreet: string
  addressHouseNumber: string
  addressZip: string
  addressCity: string
  addressCountry: string
  houseRules: string
  availabilityStart: Date
  availabilityEnd?: Date
}
