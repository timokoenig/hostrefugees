import { entity, persistence } from 'simpler-state'

export type Filter = {
  adults: number | null
  children: number | null
  city: string | null
  petsOnly: boolean
}

export type AppState = {
  filter: Filter
}

export const app = entity<AppState>(
  {
    filter: {
      adults: null,
      children: null,
      city: null,
      petsOnly: false,
    },
  },
  [persistence('app')]
)

export const setFilter = (filter: Filter) => {
  app.set({ ...app.get(), filter })
}
