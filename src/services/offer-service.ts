import { axiosClient as api } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { Offer } from '~/types/offer/interfaces/offer.interfaces'
import {
  ProficiencyLevelEnum,
  LanguagesEnum,
  Faq,
  StatusEnum,
  UserRoleEnum
} from '~/types'

export interface CreateOfferPayload {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum
  description: string
  languages: LanguagesEnum[]
  subject: string
  category: string
  FAQ: Faq[]
  status: StatusEnum
  authorRole: UserRoleEnum
}

export const offerService = {
  createOffer: (payload: CreateOfferPayload): Promise<AxiosResponse<Offer>> => {
    return api.post(URLs.offers.post, payload)
  },
  getOffers: async (params: {
    name?: string
    categoryId?: string | null
    subjectId?: string | null
    skip?: number
    limit?: number
  }) => {
    const qs: any = {}
    if (params.name && params.name.trim() !== '') {
      qs.name = params.name.trim()
      qs.search = params.name.trim()
    }
    if (params.categoryId != null && params.categoryId !== '')
      qs.categoryId = params.categoryId
    if (params.subjectId != null && params.subjectId !== '')
      qs.subjectId = params.subjectId
    if (typeof params.skip !== 'undefined') qs.skip = params.skip
    if (typeof params.limit !== 'undefined') qs.limit = params.limit

    try {
      const res = await api.get('/offers', { params: qs })
      return res.data
    } catch (err: any) {
      console.error(
        '[offerService.getOffers]',
        err?.response?.status,
        err?.response?.data || err?.message
      )
      throw err
    }
  },

  getOfferById: async (id: string) => {
    const res = await api.get(`/offers/${id}`)
    return res.data
  }
}
