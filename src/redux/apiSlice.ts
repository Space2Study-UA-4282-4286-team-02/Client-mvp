import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '~/redux/store'

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_PATH,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).appMain.accessToken

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  reducerPath: 'appApi',
  endpoints: () => ({})
})
