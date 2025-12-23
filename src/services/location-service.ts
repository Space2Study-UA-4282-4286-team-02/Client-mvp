import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { LocationCity, LocationCountry } from '~/types'

const CSC_BASE_URL =
  import.meta.env.VITE_CSC_API_BASE_PATH || 'https://api.countrystatecity.in/v1'

const locationClient: AxiosInstance = axios.create({
  baseURL: CSC_BASE_URL,
  headers: {
    'X-CSCAPI-KEY': import.meta.env.VITE_CSC_API_KEY
  }
})

export const locationService = {
  getCountries: (): Promise<AxiosResponse<LocationCountry[]>> => {
    return locationClient.get('/countries')
  },
  getCitiesByCountry: (
    countryIso2: string
  ): Promise<AxiosResponse<LocationCity[]>> => {
    return locationClient.get(`/countries/${countryIso2}/cities`)
  }
}
