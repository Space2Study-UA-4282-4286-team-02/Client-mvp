import { axiosClient } from '~/plugins/axiosClient'
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
    return axiosClient.post(URLs.offers.post, payload)
  }
}
