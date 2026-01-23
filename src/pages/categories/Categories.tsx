import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { CategoryInterface, SizeEnum } from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import useLoadMore from '~/hooks/use-load-more'
import useCategoriesNames from '~/hooks/use-categories-names'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'
import { styles } from '~/pages/categories/Categories.styles'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

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

  const { resetData } = useLoadMore<
    CategoryInterface,
    Pick<CategoryInterface, 'name'>
  >({
    service: getCategories,
    limit: cardsLimit,
    params
  })

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
    </PageWrapper>
  )
}

export default Categories
