import leak_add from '~/assets/img/offer-page/leak_add.svg'
import counter_1 from '~/assets/img/offer-page/counter_1.svg'
import counter_2 from '~/assets/img/offer-page/counter_2.svg'
import counter_3 from '~/assets/img/offer-page/counter_3.svg'
import uah_icon from '~/assets/img/find-offer/currency_uah.svg'
import {
  ProficiencyLevelEnum,
  LanguagesEnum,
  UserRoleEnum,
  Faq,
  UserRole,
  OfferFormData
} from '~/types'
import { emptyField, textField } from '~/utils/validations/common'

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

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 3500,
  DEFAULT: [0, 3500] as [number, number]
}

export const DESCRIPTION = {
  MAX_LENGTH: 2000
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
  isDirty: boolean,
  userRole: UserRole
): boolean => {
  const baseValid =
    isDirty &&
    !!data.category &&
    !!data.subject &&
    data.proficiencyLevel.length > 0 &&
    data.description.trim() !== '' &&
    data.languages.length > 0 &&
    Object.values(errors).every((e) => !e)
  if (userRole === UserRoleEnum.Tutor) {
    const faqValid = !!(
      data.FAQ &&
      data.FAQ.length > 0 &&
      data.FAQ.every(
        (faq) => faq.question.trim() !== '' && faq.answer.trim() !== ''
      )
    )
    return baseValid && !!data.title && faqValid
  }

  return baseValid
}

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  proficiencyLevel: (value: ProficiencyLevelEnum[] | string) => {
    const arr = Array.isArray(value) ? value : []
    return arr.length > 0 ? '' : 'offerPage.errorMessages.level'
  },
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(10, 2000)(value)
    ),
  languages: (value: LanguagesEnum[] | string) => {
    const arr = Array.isArray(value) ? value : []
    return arr.length > 0 ? '' : 'offerPage.errorMessages.languages'
  },
  priceRange: (value: [number, number] | string) => {
    const range = Array.isArray(value) ? value : PRICE_RANGE.DEFAULT
    return range && range[0] >= PRICE_RANGE.MIN && range[1] <= PRICE_RANGE.MAX
      ? ''
      : 'offerPage.errorMessages.price'
  },
  price: (value: number | string | undefined) => {
    const num =
      typeof value === 'number' ? value : parseInt(value as string, 10)
    return num > 0 ? '' : 'offerPage.errorMessages.price'
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
