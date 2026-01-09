import { FC } from 'react'
import CardWithLink from '../card-with-link/CardWithLink'
import { useTranslation } from 'react-i18next'

interface CategoryItemProps {
  img: string
  title: string
  offers: number
  link: string
}

const CategoryItem: FC<CategoryItemProps> = ({ img, title, offers, link }) => {
  const { t } = useTranslation()
  return (
    <CardWithLink
      description={`${offers} ${t('categoriesPage.offers')}`}
      img={img}
      link={link}
      title={title}
    />
  )
}

export default CategoryItem
