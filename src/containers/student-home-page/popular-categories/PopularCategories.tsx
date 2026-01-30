import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import CardsList from '~/components/cards-list/CardsList'
import CategoryItem from '~/components/category-item/CategoryItem'
import { CategoryInterface, ItemsWithCount } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { CategoryIconType, getCategoryIcon } from '~/utils/category-helpers'
import { defaultResponses, popularCategoriesLimit } from '~/constants'

import { styles } from './PopularCategories.styles'

const PopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: popularCategoriesLimit }),
    []
  )

  const { response, loading } = useAxios<
    ItemsWithCount<CategoryInterface>,
    undefined,
    ItemsWithCount<CategoryInterface>
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: true
  })

  const cards = useMemo(
    () =>
      response.items.map((item: CategoryInterface) => {
        return (
          <CategoryItem
            color={item.appearance.color}
            img={getCategoryIcon(item.appearance.icon as CategoryIconType)}
            key={item._id}
            link={`${authRoutes.categories.path}/subjects?categoryId=${item._id}`}
            offers={item.totalOffers.student + item.totalOffers.tutor}
            title={item.name}
          />
        )
      }),
    [response.items]
  )

  const handleViewMore = useCallback(() => {
    navigate(authRoutes.categories.path)
  }, [navigate])

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.popularCategories.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.popularCategories.title')}
      />
      <CardsList
        btnText={t('studentHomePage.popularCategories.viewMore')}
        cards={cards}
        isExpandable
        loading={loading}
        onClick={handleViewMore}
      />
    </Box>
  )
}

export default PopularCategories
