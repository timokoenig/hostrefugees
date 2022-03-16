export enum UserRole {
  Admin = 'admin',
  Guest = 'guest',
  Host = 'host',
}

export type User = {
  id: string
  firstname: string
  lastname: string
  password: string
  email: string
  role: UserRole
  languages: string[]
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
  addressCityLat?: number
  addressCityLng?: number
  addressCountry: string
  houseRules: string
  availabilityStart: Date
  availabilityEnd?: Date
}

export enum RequestStatus {
  Accepted = 'accepted',
  Declined = 'declined',
  Canceled = 'canceled',
}

export type Request = {
  id: string
  createdAt: Date
  updatedAt: Date
  author: User
  place: Place
  adults: number
  children: number
  startDate: Date
  endDate?: Date
  about: string
  status?: RequestStatus
}
