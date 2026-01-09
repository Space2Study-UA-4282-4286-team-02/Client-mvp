import { useState, useCallback, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import AppButton from '~/components/app-button/AppButton'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppSelect from '~/components/app-select/AppSelect'
import AppChip from '~/components/app-chip/AppChip'
import AppRange from '~/components/app-range/AppRange'

import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import { CategoryNameInterface, SubjectNameInterface } from '~/types'

import { styles } from './OfferRequestForm.styles'
import {
  IMAGES,
  PRICE_RANGE,
  DESCRIPTION,
  getProficiencyLevels,
  getLanguages,
  buildLanguageFields,
  handleLanguageSelection,
  validations,
  isFormValid
} from './OfferRequestForm.constants'

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

  const renderProficiencyLevels = () => (
    <Box
      onBlur={handleBlur('level')}
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {proficiencyLevels.map((level) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={data.level === level}
              onChange={(e) =>
                handleNonInputValueChange(
                  'level',
                  e.target.checked ? level : ''
                )
              }
              sx={{
                color: errors.level ? '#F54636' : undefined
              }}
            />
          }
          key={level}
          label={level}
          sx={styles.checkboxLabel}
        />
      ))}
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

      {/* Section 1 */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader}>
          <Box alt='counter 1' component='img' src={IMAGES.counter1} />

          <Typography sx={styles.sectionTitle} variant='h6'>
            {t(`offerPage.title.firstStep.${userRole}`)}
          </Typography>
        </Box>

        <Box sx={styles.sectionContent}>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.category.${userRole}`)}
          </Typography>

          <AsyncAutocomplete
            labelField='name'
            onBlur={handleBlur('category')}
            onChange={handleCategoryChange}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('offerPage.labels.category'),
              error: Boolean(errors.category),
              helperText: errors.category ? t(errors.category) : undefined
            }}
            value={data.category}
            valueField='_id'
          />

          <AsyncAutocomplete
            disabled={!data.category}
            fetchCondition={Boolean(data.category)}
            labelField='name'
            onBlur={handleBlur('subject')}
            onChange={handleSubjectChange}
            service={() =>
              subjectService.getSubjectsNames(data.category as string)
            }
            textFieldProps={{
              label: t('offerPage.labels.subject'),
              error: Boolean(errors.subject),
              helperText: errors.subject ? t(errors.subject) : undefined
            }}
            value={data.subject}
            valueField='_id'
          />

          <Box>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.level.${userRole}`)}
            </Typography>
            {renderProficiencyLevels()}
            {errors.level && (
              <Typography sx={styles.errorText}>{t(errors.level)}</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Section 2 */}
      <Box sx={styles.section}>
        <Box sx={styles.sectionHeader}>
          <Box alt='counter 2' component='img' src={IMAGES.counter2} />
          <Typography sx={styles.sectionTitle} variant='h6'>
            {t(`offerPage.title.secondStep.${userRole}`)}
          </Typography>
        </Box>

        <Box sx={styles.sectionContent}>
          <Box>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.describe.${userRole}`)}
            </Typography>
            <AppTextArea
              errorMsg={errors.description ? t(errors.description) : undefined}
              fullWidth
              maxLength={DESCRIPTION.MAX_LENGTH}
              onBlur={handleBlur('description')}
              onChange={(e) =>
                handleNonInputValueChange('description', e.target.value)
              }
              placeholder={t(`offerPage.labels.describe.${userRole}`)}
              sx={{ mt: '6px' }}
              value={data.description}
            />
          </Box>

          <Box>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.languages.${userRole}`)}
            </Typography>
            <AppSelect
              error={Boolean(errors.languages)}
              fields={buildLanguageFields(languages)}
              label={t('offerPage.labels.language')}
              multiple
              onBlur={handleBlur('languages')}
              onClose={handleLanguageSelectClose}
              onOpen={handleLanguageSelectOpen}
              open={isLanguageSelectOpen}
              setValue={handleLanguageChange}
              sx={{ mt: '6px' }}
              value={data.languages}
            />
            {errors.languages && (
              <Typography sx={styles.errorText}>
                {t(errors.languages)}
              </Typography>
            )}
            {data.languages.length > 0 && renderLanguageChips()}
          </Box>

          <Box>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.price.${userRole}`)}
            </Typography>
            <AppRange
              max={PRICE_RANGE.MAX}
              min={PRICE_RANGE.MIN}
              onChange={(newRange) =>
                handleNonInputValueChange('priceRange', newRange)
              }
              value={data.priceRange}
            />
            {errors.priceRange && (
              <Typography sx={styles.errorText}>
                {t(errors.priceRange)}
              </Typography>
            )}
            <Typography sx={styles.tutorsCount}>
              {tutorsCount} tutors fit your needs
            </Typography>
          </Box>
        </Box>
      </Box>

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
