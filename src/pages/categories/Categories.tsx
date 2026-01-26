import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, SizeEnum } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useLoadMore from '~/hooks/use-load-more'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'
import { styles } from '~/pages/categories/Categories.styles'

import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CardsList from '~/components/cards-list/CardsList'
import CategoryItem from '~/components/category-item/CategoryItem'
import DirectionLink from '~/components/direction-link/DirectionLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'

import imgIconGlobe from '~/assets/img/categories/globe-icon.svg'
import imgIconHash from '~/assets/img/categories/hash-icon.svg'

type IconType = 'math' | 'history' | 'physics' | 'chem' | 'book'

const imgToIcon = (img: IconType): string => {
  if (img === 'history') return imgIconGlobe

  return imgIconHash
}

const Categories = () => {
  const { t } = useTranslation()

  const [match, setMatch] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)

  const params = useMemo(() => ({ name: match }), [match])

  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    (data?: Pick<CategoryInterface, 'name'>) =>
      categoryService.getCategories(data),
    []
  )

  const {
    loading: categoryNamesLoading,
    response: categoryNamesItems,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const getCategoryNames = () => {
    if (!isFetched) void fetchData()
    setIsFetched(true)
  }

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <CategoryItem
            color={item.appearance.color}
            img={imgToIcon(item.appearance.icon as IconType)}
            key={item._id}
            link={`${authRoutes.categories.path}/subjects?categoryId=${item._id}`}
            offers={item.totalOffers.student + item.totalOffers.tutor}
            title={item.name}
          />
        )
      }),
    [categories]
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t(`categoriesPage.description`)}
        style={styles.titleWithDescription}
        title={t(`categoriesPage.title`)}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={getCategoryNames}
          onSearchChange={resetData}
          options={
            categoryNamesItems
              ? mapArrayByField(categoryNamesItems, 'name')
              : []
          }
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          description={t('errorMessages.tryAgainText', { name: 'categories' })}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
