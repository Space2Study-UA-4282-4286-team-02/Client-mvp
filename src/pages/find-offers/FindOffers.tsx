import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PopularCategoriesOffers from '~/components/popular-categories-offers/PopularCategories'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles as subjectsStyles } from '~/pages/subjects/Subjects.styles'
import ViewSwitcher, { ViewMode } from '~/components/view-switcher/ViewSwitcher'

const FindOffers = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const nameQuery = searchParams.get('name') ?? ''
  const sortQuery = searchParams.get('sort') ?? 'createdAt'

  const [match, setMatch] = useState<string>(nameQuery)
  const [isFetchedSubjects, setIsFetchedSubjects] = useState(false)

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [offers, setOffers] = useState<any[]>([])
  const [loadingOffers, setLoadingOffers] = useState(false)
  const [errorOffers, setErrorOffers] = useState<string | null>(null)

  useEffect(() => {
    setMatch(nameQuery)
  }, [nameQuery])

  const getSubjectNames = () => {
    if (!isFetchedSubjects) setIsFetchedSubjects(true)
  }

  const getId = (value: any): string | null => {
    return value?._id ?? null
  }

  const onCategoryChange = (_: React.SyntheticEvent, value: any | null) => {
    const newParams = new URLSearchParams(searchParams)
    const id = getId(value)

    if (id) newParams.set('categoryId', id)
    else newParams.delete('categoryId')

    newParams.delete('subjectId')

    setIsFetchedSubjects(false)
    setSearchParams(newParams)
  }

  const onSubjectChange = (_: React.SyntheticEvent, value: any | null) => {
    const newParams = new URLSearchParams(searchParams)
    const id = getId(value)

    if (id) newParams.set('subjectId', id)
    else newParams.delete('subjectId')

    setSearchParams(newParams)
  }

  const onSearch = (value?: string) => {
    const newParams = new URLSearchParams(searchParams)
    const finalName = (typeof value === 'string' ? value : match ?? '').trim()

    if (finalName) newParams.set('name', finalName)
    else newParams.delete('name')

    newParams.delete('skip')
    setSearchParams(newParams)

    setMatch(finalName)
  }

  const onSortChange = (event: SelectChangeEvent<string>) => {
    const newParams = new URLSearchParams(searchParams)
    const value = event.target.value

    if (value) newParams.set('sort', value)
    else newParams.delete('sort')

    newParams.delete('skip')
    setSearchParams(newParams)
  }

  const searchParamsKey = searchParams.toString()

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoadingOffers(true)
      setErrorOffers(null)

      try {
        const params: any = {
          name: searchParams.get('name') || undefined,
          categoryId: searchParams.get('categoryId') || undefined,
          subjectId: searchParams.get('subjectId') || undefined,
          sort: searchParams.get('sort') ?? 'createdAt',
          authorRole: 'tutor',
          skip: 0,
          limit: 50
        }

        console.log(
          '[FindOffers.load] calling offerService.getOffers with params ->',
          params
        )
        const data = await offerService.getOffers(params)
        console.log('[FindOffers.load] got response from offerService ->', data)

        if (!mounted) return

        const items = data.items ?? data ?? []
        setOffers(Array.isArray(items) ? items : [])
      } catch (err: any) {
        if (!mounted) return
        console.error('[FindOffers.load] error ->', err)
        setErrorOffers(err?.message || t('findOffers.errors.loadingOffers'))
      } finally {
        if (mounted) setLoadingOffers(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [searchParamsKey, t])

  const sortOptions = [
    { value: 'createdAt', label: t('findOffers.sortTitles.newest') },
    { value: 'rating', label: t('findOffers.sortTitles.rating') },
    { value: 'priceAsc', label: t('findOffers.sortTitles.priceAsc') },
    { value: 'priceDesc', label: t('findOffers.sortTitles.priceDesc') }
  ]

  const renderSortSelect = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {t('common.labels.sortBy')}
      </Typography>
      <FormControl size='small' sx={{ minWidth: 180 }}>
        <Select onChange={onSortChange} value={sortQuery}>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={subjectsStyles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />

      <Box sx={subjectsStyles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize='small' />}
          linkTo={'/categories/'}
          title={t('findOffers.backToAllCategories')}
        />
      </Box>

      <AppToolbar sx={subjectsStyles.searchToolbar}>
        {!breakpoints.isMobile && (
          <AsyncAutocomplete
            key={`category-${categoryId || 'none'}`}
            labelField='name'
            onChange={onCategoryChange}
            service={categoryService.getCategoriesNames}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{ label: t('breadCrumbs.categories') }}
            value={categoryId || null}
            valueField='_id'
          />
        )}

        {!breakpoints.isMobile && (
          <AsyncAutocomplete
            fetchCondition={!!categoryId}
            key={`subject-${categoryId || 'none'}`}
            labelField='name'
            onChange={onSubjectChange}
            service={() => subjectService.getSubjectsNames(categoryId || null)}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{
              label: t('findOffers.subjectAutocomplete.label')
            }}
            value={subjectId || null}
            valueField='_id'
          />
        )}

        <SearchAutocomplete
          loading={false}
          onFocus={getSubjectNames}
          onSearchChange={onSearch}
          options={[]}
          search={match}
          setSearch={setMatch}
          textFieldProps={{ label: t('findOffers.searchToolbar.label') }}
        />
      </AppToolbar>

      {breakpoints.isMobile && (
        <Box sx={{ mt: 2 }}>
          <AsyncAutocomplete
            key={`category-mobile-${categoryId || 'none'}`}
            labelField='name'
            onChange={onCategoryChange}
            service={categoryService.getCategoriesNames}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{ label: t('breadCrumbs.categories') }}
            value={categoryId || null}
            valueField='_id'
          />
          <Box sx={{ height: 12 }} />
          <AsyncAutocomplete
            fetchCondition={!!categoryId}
            key={`subject-mobile-${categoryId || 'none'}`}
            labelField='name'
            onChange={onSubjectChange}
            service={() => subjectService.getSubjectsNames(categoryId || null)}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{
              label: t('findOffers.subjectAutocomplete.label')
            }}
            value={subjectId || null}
            valueField='_id'
          />
        </Box>
      )}

      <Box
        sx={{
          mt: breakpoints.isMobile ? 2 : 3,
          display: 'flex',
          justifyContent: breakpoints.isMobile ? 'flex-start' : 'flex-end'
        }}
      >
        <Box
          sx={{
            width: breakpoints.isMobile ? '100%' : 'auto',
            maxWidth: breakpoints.isMobile ? 240 : 'none'
          }}
        >
          {renderSortSelect()}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        {errorOffers && <Typography color='error'>{errorOffers}</Typography>}

        {offers.length > 0 ? (
          <Box
            sx={{
              mt: 2,
              display: 'grid',
              gridTemplateColumns:
                viewMode === 'list' ? '1fr' : 'repeat(3, 1fr)'
            }}
          >
            {offers.map((o: any) => (
              <Box
                key={o._id}
                sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}
              >
                <Typography variant='subtitle1'>{o.title}</Typography>

                <Typography variant='body2' sx={{ mt: 1 }}>
                  <strong>{t('findOffers.item.subject')}</strong>{' '}
                  {o.subject.name}{' '}
                  <span style={{ marginLeft: 12 }}>
                    <strong>{t('findOffers.item.category')}</strong>{' '}
                    {o.category.name}
                  </span>
                </Typography>

                <Typography variant='body2' sx={{ mt: 1 }}>
                  {o.author.lastName}, {o.author.firstName}
                </Typography>

                <Typography variant='body2' sx={{ mt: 1 }}>
                  <strong>Rating:</strong> {o.author.averageRating.tutor}
                  <span style={{ marginLeft: 12 }}>
                    <strong>Price:</strong>{' '}
                    {new Intl.NumberFormat('en-US').format(o.price)}
                  </span>
                  <span style={{ marginLeft: 12 }}>
                    <strong>Date created:</strong>{' '}
                    {new Date(o.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </Typography>
              </Box>
            ))}
          </Box>
        ) : loadingOffers ? (
          <Typography>{t('findOffers.loading')}</Typography>
        ) : (
          !errorOffers && (
            <Typography sx={{ color: 'text.secondary' }}>
              {t('findOffers.notFound.description')}
            </Typography>
          )
        )}

        <PopularCategoriesOffers />
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
