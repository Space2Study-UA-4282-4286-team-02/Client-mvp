import { useState, useCallback, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import AppChip from '~/components/app-chip/AppChip'

import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import { CategoryNameInterface, SubjectNameInterface } from '~/types'

import { styles } from './OfferRequestForm.styles'
import {
  IMAGES,
  PRICE_RANGE,
  getProficiencyLevels,
  getLanguages,
  buildLanguageFields,
  handleLanguageSelection,
  validations,
  isFormValid
} from './OfferRequestForm.constants'
import FirstStepSpecialization from './FirstStepSpecialization'
import SecondStepParameters from './SecondStepParameters'
// import ThirdStepFaq from './ThirdStepFaq'

const OfferRequestForm = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  const {
    data,
    errors,
    isDirty,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues: {
      category: null as string | null,
      subject: null as string | null,
      level: '',
      description: '',
      languages: [] as string[],
      priceRange: PRICE_RANGE.DEFAULT as [number, number]
    },
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
      console.log('Form submitted', data)
    },
    validations
  })

  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false)
  const tutorsCount = 0
  const proficiencyLevels = getProficiencyLevels(t)
  const languages = getLanguages(t)
  const allLanguagesLabel = t('common.languages.allLanguages')

  const renderLanguageChips = () => (
    <Box sx={styles.chipContainer}>
      {data.languages.includes(allLanguagesLabel) ? (
        <AppChip
          handleDelete={() => handleNonInputValueChange('languages', [])}
        >
          {allLanguagesLabel}
        </AppChip>
      ) : (
        data.languages.map((lang) => (
          <AppChip handleDelete={() => handleRemoveLanguage(lang)} key={lang}>
            {lang}
          </AppChip>
        ))
      )}
    </Box>
  )

  const handleLanguageChange = useCallback(
    (newValue: string | string[]) => {
      const selectedArray = handleLanguageSelection(newValue, allLanguagesLabel)
      handleNonInputValueChange('languages', selectedArray)
      setIsLanguageSelectOpen(false)
    },
    [allLanguagesLabel, handleNonInputValueChange]
  )

  const handleCategoryChange = useCallback(
    (event: SyntheticEvent, value: CategoryNameInterface | null) => {
      handleNonInputValueChange('category', value?._id || null)
      handleNonInputValueChange('subject', null)
      handleNonInputValueChange('level', '')
    },
    [handleNonInputValueChange]
  )

  const handleSubjectChange = useCallback(
    (event: SyntheticEvent, value: SubjectNameInterface | null) =>
      handleNonInputValueChange('subject', value?._id || null),
    [handleNonInputValueChange]
  )

  const handleRemoveLanguage = useCallback(
    (langToRemove: string) =>
      handleNonInputValueChange(
        'languages',
        data.languages.filter((l) => l !== langToRemove)
      ),
    [data.languages, handleNonInputValueChange]
  )

  const handleLanguageSelectOpen = useCallback(
    () => setIsLanguageSelectOpen(true),
    []
  )

  const handleLanguageSelectClose = useCallback(
    () => setIsLanguageSelectOpen(false),
    []
  )

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.root}>
      {/* Header */}
      <Box sx={styles.header}>
        <Box alt='leak_add' component='img' src={IMAGES.leakAdd} />
        <Typography sx={styles.title} variant='h5'>
          {t(`offerPage.createOffer.title.${userRole}`)}
        </Typography>
      </Box>
      <Typography sx={styles.description}>
        {t(`offerPage.createOffer.description.${userRole}`)}
      </Typography>

      <FirstStepSpecialization
        categoryService={categoryService}
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleCategoryChange={handleCategoryChange}
        handleNonInputValueChange={
          handleNonInputValueChange as (
            key: keyof typeof data,
            value: unknown
          ) => void
        }
        handleSubjectChange={handleSubjectChange}
        proficiencyLevels={proficiencyLevels}
        subjectService={subjectService}
        t={t}
        userRole={userRole}
      />

      <SecondStepParameters
        PRICE_RANGE={PRICE_RANGE}
        buildLanguageFields={buildLanguageFields}
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleLanguageChange={handleLanguageChange}
        handleLanguageSelectClose={handleLanguageSelectClose}
        handleLanguageSelectOpen={handleLanguageSelectOpen}
        handleNonInputValueChange={
          handleNonInputValueChange as (
            key: keyof typeof data,
            value: unknown
          ) => void
        }
        isLanguageSelectOpen={isLanguageSelectOpen}
        languages={languages}
        renderLanguageChips={renderLanguageChips}
        t={t}
        tutorsCount={tutorsCount}
        userRole={userRole}
      />

      {/* {String(userRole) === 'tutor' && (
        <ThirdStepFaq
          errors={errors}
          handleBlur={handleBlur}
          t={t}
          userRole={userRole}
        />
      )} */}

      {/* Footer */}
      <Box sx={styles.footer}>
        <AppButton
          disabled={!isFormValid(data, errors, isDirty)}
          fullWidth
          type='submit'
        >
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton fullWidth variant='outlined'>
          {t(`offerPage.createOffer.buttonTitles.addToDrafts`)}
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferRequestForm
