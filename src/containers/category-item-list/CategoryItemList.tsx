import { styles } from '~/containers/category-item-list/CategoryItemList.styles'
import CategoryItem from '~/components/category-item/CategoryItem'
import imgIconGlobe from '~/assets/img/categories/globe-icon.svg'
import imgIconHash from '~/assets/img/categories/hash-icon.svg'
import { Box } from '@mui/material'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useCallback, useEffect, useState } from 'react'
import AppButton from '~/components/app-button/AppButton'
import { categoryService } from '~/services/category-service'
import useAxios from '~/hooks/use-axios'
import {
  CategoriesParams,
  CategoryInterface,
  ErrorResponse,
  ItemsWithCount
} from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'

type IconType = 'math' | 'history' | 'physics' | 'chem' | 'book'

const imgToIcon = (img: IconType): string => {
  if (img === 'history') return imgIconGlobe

  return imgIconHash
}

const CategoryItemList = () => {
  const [arr, setArr] = useState<
    Array<{
      id: string
      color: string
      img: string
      link: string
      offers: number
      title: string
    }>
  >([])
  const [skip, setSkip] = useState(0)
  const limit = 1
  const onClickFnk = () => {
    setSkip(skip + limit)
  }

  const { setAlert } = useSnackBarContext()

  const getCategories = useCallback(
    () =>
      categoryService.getCategories({
        limit,
        skip
      }),
    [skip]
  )

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const { response } = useAxios<
    ItemsWithCount<CategoryInterface>,
    CategoriesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  useEffect(() => {
    const newItems = (response?.items ?? [])
      .map((item) => {
        return {
          id: item._id,
          color: item.appearance.color,
          img: imgToIcon(item.appearance.icon as IconType),
          link: `/categories/${item._id}`,
          offers: item.totalOffers.student + item.totalOffers.tutor,
          title: item.name
        }
      })
      .filter((item) => !arr.some((e) => e.id === item.id))
    const newArr = [...arr, ...newItems]
    setArr(newArr)
  }, [response])

  const { isMobile, isTablet } = useBreakpoints()
  let boxStyle = styles.grid
  if (isMobile) boxStyle = styles.gridMobile
  else if (isTablet) boxStyle = styles.gridTablet
  return (
    <>
      <Box sx={boxStyle}>
        {arr.map((item) => (
          <CategoryItem
            color={item.color}
            img={item.img}
            key={item.id}
            link={item.link}
            offers={item.offers}
            title={item.title}
          />
        ))}
      </Box>
      {arr.length < response.count && (
        <AppButton onClick={onClickFnk} sx={styles.buttonViewMore}>
          View more
        </AppButton>
      )}
    </>
  )
}

export default CategoryItemList
