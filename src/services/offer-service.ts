import { axiosClient as api } from '~/plugins/axiosClient'

export const offerService = {
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
    if (params.categoryId != null && params.categoryId !== '') qs.categoryId = params.categoryId
    if (params.subjectId != null && params.subjectId !== '') qs.subjectId = params.subjectId
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
 