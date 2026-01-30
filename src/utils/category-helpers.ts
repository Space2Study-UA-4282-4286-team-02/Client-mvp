import imgIconGlobe from '~/assets/img/categories/globe-icon.svg'
import imgIconHash from '~/assets/img/categories/hash-icon.svg'

export type CategoryIconType = 'math' | 'history' | 'physics' | 'chem' | 'book'

export const getCategoryIcon = (icon: CategoryIconType): string => {
  if (icon === 'history') return imgIconGlobe

  return imgIconHash
}
