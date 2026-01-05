import { appApi } from '~/redux/apiSlice'
import { URLs } from '~/constants/request'
import { Country, City } from '~/types'

export const locationService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<Country[], void>({
      query: () => ({
        url: URLs.location.getCountries,
        method: 'GET'
      })
    }),

    getCities: build.query<City[], string>({
      query: (countryCode) => ({
        url: `${URLs.location.getCities}/${countryCode}`,
        method: 'GET'
      })
    })
  })
})

export const { useLazyGetCountriesQuery, useLazyGetCitiesQuery } =
  locationService
