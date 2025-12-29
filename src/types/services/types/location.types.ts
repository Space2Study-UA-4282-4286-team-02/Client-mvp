export interface LocationCountry {
  id: number
  name: string
  iso2: string
  iso3?: string
}

export interface LocationCity {
  id: number
  name: string
  state_code?: string
  state_name?: string
  country_code?: string
}
