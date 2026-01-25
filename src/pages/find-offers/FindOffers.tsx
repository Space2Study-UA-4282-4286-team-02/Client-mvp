import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles as subjectsStyles } from '~/pages/subjects/Subjects.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const nameQuery = searchParams.get('name') ?? ''

  const [match, setMatch] = useState<string>(nameQuery)
  const [isFetchedSubjects, setIsFetchedSubjects] = useState(false)

  const [offers, setOffers] = useState<any[]>([])
  const [offersCount, setOffersCount] = useState<number>(0)
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
    const finalName = (typeof value === 'string' ? value : (match ?? '')).trim()

    if (finalName) newParams.set('name', finalName)
    else newParams.delete('name')

    newParams.delete('skip')
    setSearchParams(newParams)

    setMatch(finalName)
  }

  const searchParamsKey = searchParams.toString()

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoadingOffers(true)
      setErrorOffers(null)

      try {
        const params: any = {}
        const name = searchParams.get('name')
        const cat = searchParams.get('categoryId')
        const subj = searchParams.get('subjectId')

        if (name) params.name = name
        if (cat) params.categoryId = cat
        if (subj) params.subjectId = subj
        params.skip = 0
        params.limit = 50

        console.log('[FindOffers.load] calling offerService.getOffers with params ->', params)
        const data = await offerService.getOffers(params)
        console.log('[FindOffers.load] got response from offerService ->', data)

        if (!mounted) return

        if (data && Array.isArray(data.items)) {
          setOffers(data.items)
          setOffersCount(typeof data.count === 'number' ? data.count : data.items.length)
        } else if (Array.isArray(data)) {
          setOffers(data)
          setOffersCount(data.length)
        } else {
          setOffers(Array.isArray(data?.items) ? data.items : [])
          setOffersCount((data && data.count) || 0)
        }
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
  }, [searchParamsKey])

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        title={t('findOffers.titleWithDescription.title')}
        description={t('findOffers.titleWithDescription.description')}
        style={subjectsStyles.titleWithDescription}
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
            key={`subject-${categoryId || 'none'}`}
            fetchCondition={!!categoryId}
            labelField='name'
            onChange={onSubjectChange}
            service={() => subjectService.getSubjectsNames(categoryId || null)}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{ label: t('findOffers.subjectAutocomplete.label') }}
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
            key={`subject-mobile-${categoryId || 'none'}`}
            fetchCondition={!!categoryId}
            labelField='name'
            onChange={onSubjectChange}
            service={() => subjectService.getSubjectsNames(categoryId || null)}
            sx={subjectsStyles.categoryInput}
            textFieldProps={{ label: t('findOffers.subjectAutocomplete.label') }}
            value={subjectId || null}
            valueField='_id'
          />
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        {errorOffers && <Typography color='error'>{errorOffers}</Typography>}

        {offers.length > 0 ? (
          <Box sx={{ mt: 2 }}>
            {offers.map((o: any) => (
              <Box key={o._id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <Typography variant='subtitle1'>{o.title ?? o.name ?? '-'}</Typography>

                <Typography variant='body2' sx={{ mt: 1 }}>
                  <strong>{t('findOffers.item.subject')}</strong>{' '}
                  {o.subject?.name ?? o.subjectName ?? '-'}{' '}
                  <span style={{ marginLeft: 12 }}>
                    <strong>{t('findOffers.item.category')}</strong>{' '}
                    {o.category?.name ?? o.categoryName ?? '-'}
                  </span>
                </Typography>

                <Typography variant='body2' sx={{ mt: 1 }}>
                  {o.author ? `${o.author.lastName ?? '-'}, ${o.author.firstName ?? '-'}` : '-'}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : loadingOffers ? (
          <Typography>{t('findOffers.loading')}</Typography>
        ) : (
          !errorOffers && <Typography sx={{ color: 'text.secondary' }}>{t('findOffers.notFound.description')}</Typography>
        )}
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
