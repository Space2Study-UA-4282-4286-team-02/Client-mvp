import { styles } from '~/containers/category-item-list/CategoryItemList.styles'
import CategoryItem from '~/components/category-item/CategoryItem'
import imgIconGlobe from '~/assets/img/categories/globe-icon.svg'
import imgIconHash from '~/assets/img/categories/hash-icon.svg'
import { Box } from '@mui/material'
import { FC } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'
import { CategoryInterface } from '~/types'

type IconType = 'math' | 'history' | 'physics' | 'chem' | 'book'

const imgToIcon = (img: IconType): string => {
  if (img === 'history') return imgIconGlobe

  return imgIconHash
}

interface CategoryItemListProps {
  items: Array<Omit<CategoryInterface, 'createdAt' | 'updatedAt'>>
}

const CategoryItemList: FC<CategoryItemListProps> = ({ items }) => {
  const { isMobile, isTablet } = useBreakpoints()
  let boxStyle = styles.grid
  if (isMobile) boxStyle = styles.gridMobile
  else if (isTablet) boxStyle = styles.gridTablet
  return (
    <Box sx={boxStyle}>
      {items.map((item) => (
        <CategoryItem
          color={item.appearance.color}
          img={imgToIcon(item.appearance.icon as IconType)}
          key={item._id}
          link={`/categories/subjects/${item._id}`}
          offers={item.totalOffers.student + item.totalOffers.tutor}
          title={item.name}
        />
      ))}
    </Box>
  )
}

export default CategoryItemList
