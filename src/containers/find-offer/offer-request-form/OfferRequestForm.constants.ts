import leak_add from '~/assets/img/offer-page/leak_add.svg'
import counter_1 from '~/assets/img/offer-page/counter_1.svg'
import counter_2 from '~/assets/img/offer-page/counter_2.svg'
import counter_3 from '~/assets/img/offer-page/counter_3.svg'
import { SelectFieldType } from '~/types'
import { emptyField, textField } from '~/utils/validations/common'
import { TFunction } from 'i18next'

interface FormData {
  category: string | null
  subject: string | null
  level: string
  description: string
  languages: string[]
  priceRange: [number, number]
}

interface FormErrors {
  category?: string
  subject?: string
  level?: string
  description?: string
  languages?: string
  priceRange?: string
}

export const IMAGES = {
  leakAdd: leak_add,
  counter1: counter_1,
  counter2: counter_2,
  counter3: counter_3
}

export const PRICE_RANGE = {
  MIN: 150,
  MAX: 3500,
  DEFAULT: [150, 3500] as [number, number]
}

export const DESCRIPTION = {
  MAX_LENGTH: 2000
}

export const getProficiencyLevels = (
  t: TFunction<'translation', undefined>
): string[] => [
  t('common.levels.beginner'),
  t('common.levels.intermediate'),
  t('common.levels.advanced'),
  t('common.levels.test preparation'),
  t('common.levels.professional')
]

export const getLanguages = (
  t: TFunction<'translation', undefined>
): string[] => [
  t('common.languages.allLanguages'),
  t('common.languages.english'),
  t('common.languages.ukrainian'),
  t('common.languages.polish'),
  t('common.languages.german'),
  t('common.languages.french'),
  t('common.languages.spanish'),
  t('common.languages.arabic')
]

export const buildLanguageFields = (
  languages: string[]
): SelectFieldType<string>[] =>
  languages.map((lang) => ({
    value: lang,
    title: lang
  }))

export const handleLanguageSelection = (
  newValue: string | string[],
  allLanguagesLabel: string
): string[] => {
  const selectedArray = Array.isArray(newValue) ? newValue : [newValue]

  if (selectedArray.includes(allLanguagesLabel)) {
    return [allLanguagesLabel]
  }

  return selectedArray
}

export const isFormValid = (
  data: FormData,
  errors: FormErrors,
  isDirty: boolean
): boolean => {
  return (
    isDirty &&
    !!data.category &&
    !!data.subject &&
    !!data.level &&
    data.description.trim() !== '' &&
    data.languages.length > 0 &&
    Object.values(errors).every((e) => !e)
  )
}

export const validations = {
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  level: (value: string) => emptyField(value, 'offerPage.errorMessages.level'),
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.errorMessages.description',
      textField(10, 2000)(value)
    ),
  languages: (value: string | string[]) => {
    const arr = Array.isArray(value) ? value : []
    return arr && arr.length > 0 ? '' : 'offerPage.errorMessages.languages'
  },
  priceRange: (value: string | [number, number]) => {
    const range = Array.isArray(value) ? value : PRICE_RANGE.DEFAULT
    return range && range[0] >= 150 && range[1] <= 3500
      ? ''
      : 'offerPage.errorMessages.price'
  }
}
