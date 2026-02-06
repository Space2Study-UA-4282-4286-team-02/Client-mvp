import imgIconGlobe from '~/assets/img/categories/globe-icon.svg'
import imgIconHash from '~/assets/img/categories/hash-icon.svg'
import imgIconBiology from '~/assets/img/categories/biology-icon.svg'
import imgIconChemistry from '~/assets/img/categories/chemistry-icon.svg'
import imgIconComputer from '~/assets/img/categories/computer-icon.svg'
import imgIconDesign from '~/assets/img/categories/design-icon.svg'
import imgIconFinances from '~/assets/img/categories/finances-icon.svg'
import imgIconMusic from '~/assets/img/categories/music-icon.svg'
import imgIconPainting from '~/assets/img/categories/painting-icon.svg'
import imgIconStar from '~/assets/img/categories/star-icon.svg'

export type CategoryIconType =
  | 'globe'
  | 'hash'
  | 'biology'
  | 'chemistry'
  | 'computer'
  | 'code'
  | 'design'
  | 'finances'
  | 'music'
  | 'painting'
  | 'star'
  | 'history'
  | 'book'

export const getCategoryIcon = (icon: CategoryIconType): string => {
  const iconMap: Record<CategoryIconType, string> = {
    globe: imgIconGlobe,
    hash: imgIconHash,
    biology: imgIconBiology,
    chemistry: imgIconChemistry,
    computer: imgIconComputer,
    code: imgIconComputer,
    design: imgIconDesign,
    finances: imgIconFinances,
    music: imgIconMusic,
    painting: imgIconPainting,
    star: imgIconStar,
    history: imgIconGlobe,
    book: imgIconStar
  }

  return iconMap[icon] || imgIconHash
}
