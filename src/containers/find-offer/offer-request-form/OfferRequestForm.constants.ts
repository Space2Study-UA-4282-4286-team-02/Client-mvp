import leak_add from '~/assets/img/offer-page/leak_add.svg'
import counter_1 from '~/assets/img/offer-page/counter_1.svg'
import counter_2 from '~/assets/img/offer-page/counter_2.svg'
import counter_3 from '~/assets/img/offer-page/counter_3.svg'
import uah_icon from '~/assets/img/find-offer/currency_uah.svg'
import { ProficiencyLevelEnum, LanguagesEnum, Faq } from '~/types'
import { emptyField, textField } from '~/utils/validations/common'

export interface OfferFormData {
  price?: number
  proficiencyLevel: ProficiencyLevelEnum | ''
  title?: string
  description: string
  languages: LanguagesEnum[]
  subject: string | null
  category: string | null
  FAQ?: Faq[]
}

interface OfferFormErrors {
  category?: string
  subject?: string
  proficiencyLevel?: string
  description?: string
  languages?: string
  priceRange?: string
  price?: string
  title?: string
  FAQ?: string
}

export const IMAGES = {
  leakAdd: leak_add,
  counter1: counter_1,
  counter2: counter_2,
  counter3: counter_3,
  uahIcon: uah_icon
}

export const FIELD_LIMITS = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 2000,
  QUESTION_MAX_LENGTH: 200,
  ANSWER_MAX_LENGTH: 400
}

export const FAQ_LIMITS = {
  MIN: 1,
  MAX: 5
}

export const getLanguageTranslationKey = (lang: LanguagesEnum): string => {
  const keyMap: Record<LanguagesEnum, string> = {
    [LanguagesEnum.English]: 'common.languages.english',
    [LanguagesEnum.Ukrainian]: 'common.languages.ukrainian',
    [LanguagesEnum.Polish]: 'common.languages.polish',
    [LanguagesEnum.German]: 'common.languages.german',
    [LanguagesEnum.French]: 'common.languages.french',
    [LanguagesEnum.Spanish]: 'common.languages.spanish',
    [LanguagesEnum.Arabic]: 'common.languages.arabic'
  }
  return keyMap[lang]
}

export const getProficiencyLevelTranslationKey = (
  level: ProficiencyLevelEnum
): string => {
  const keyMap: Record<ProficiencyLevelEnum, string> = {
    [ProficiencyLevelEnum.Beginner]: 'common.levels.beginner',
    [ProficiencyLevelEnum.Intermediate]: 'common.levels.intermediate',
    [ProficiencyLevelEnum.Advanced]: 'common.levels.advanced',
    [ProficiencyLevelEnum.TestPreparation]: 'common.levels.test preparation',
    [ProficiencyLevelEnum.Professional]: 'common.levels.professional',
    [ProficiencyLevelEnum.Specialized]: 'common.levels.specialized'
  }
  return keyMap[level]
}

export const handleLanguageSelection = (
  newValue: LanguagesEnum | LanguagesEnum[]
): LanguagesEnum[] => {
  const selectedArray = Array.isArray(newValue) ? newValue : [newValue]
  return selectedArray
}

export const isFormValid = (
  data: OfferFormData,
  errors: OfferFormErrors,
  isDirty: boolean
): boolean => {
  const faqValid = !!(
    data.FAQ &&
    data.FAQ.length > 0 &&
    data.FAQ.every(
      (faq) => faq.question.trim() !== '' && faq.answer.trim() !== ''
    )
  )

  const baseValid =
    isDirty &&
    !!data.category &&
    !!data.subject &&
    !!data.proficiencyLevel &&
    data.description.trim() !== '' &&
    data.languages.length > 0 &&
    !!data.title &&
    (data.price ?? 0) > 0 &&
    faqValid &&
    Object.values(errors).every((error) => !error)

  return baseValid
}

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  proficiencyLevel: (value: ProficiencyLevelEnum | string) => {
    return value && value !== '' ? '' : 'offerPage.errorMessages.level'
  },
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(10, FIELD_LIMITS.DESCRIPTION_MAX_LENGTH)(value)
    ),
  languages: (value: LanguagesEnum[] | string) => {
    const arr = Array.isArray(value) ? value : []
    return arr.length > 0 ? '' : 'offerPage.errorMessages.languages'
  },
  price: (value: number | string | undefined) => {
    if (value === undefined || value === '')
      return 'offerPage.errorMessages.price'
    const num = typeof value === 'number' ? value : parseInt(value, 10)
    return !isNaN(num) && num > 0 ? '' : 'offerPage.errorMessages.price'
  },
  title: (value: string | undefined) =>
    emptyField(value as string | null, 'offerPage.errorMessages.title'),
  FAQ: (value: Faq[] | undefined | string) => {
    const arr = Array.isArray(value) ? value : []
    const isValid =
      arr.length > 0 &&
      arr.every((faq) => faq.question.trim() !== '' && faq.answer.trim() !== '')
    return isValid ? '' : 'offerPage.errorMessages.faq'
  }
}
