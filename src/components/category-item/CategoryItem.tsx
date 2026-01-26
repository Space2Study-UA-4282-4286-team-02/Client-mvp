import { FC } from 'react'
import { styles } from '~/components/category-item/CategoryItem.styles'
import { useTranslation } from 'react-i18next'
import AppCard from '../app-card/AppCard'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

interface CategoryItemProps {
  img: string
  color: string
  title: string
  offers: number
  link: string
}

const CategoryItem: FC<CategoryItemProps> = ({
  img,
  color,
  title,
  offers,
  link
}) => {
  const { t } = useTranslation()
  return (
    <AppCard link={link} style={styles.flexbox}>
      <svg height='62' style={styles.img} viewBox='0 0 62 62' width='62'>
        <use href={img} style={{ color: color }}></use>
      </svg>
      <TitleWithDescription
        description={`${offers} ${t('categoriesPage.offers')}`}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
    // <CardWithLink
    //   color={color}
    //   description={`${offers} ${t('categoriesPage.offers')}`}
    //   img={img}
    //   link={link}
    //   title={title}
    // />
  )
}

export default CategoryItem
