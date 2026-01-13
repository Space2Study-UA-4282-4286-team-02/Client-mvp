import { useState, useCallback, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'

import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import {
  CategoryNameInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum,
  LanguagesEnum,
  UserRoleEnum,
  StatusEnum,
  UserRole,
  OfferFormData
} from '~/types'

import { styles } from './OfferRequestForm.styles'
import {
  IMAGES,
  PRICE_RANGE,
  validations,
  isFormValid,
  getProficiencyLevelTranslationKey
} from './OfferRequestForm.constants'
import FirstStepSpecialization from './FirstStepSpecialization'
import SecondStepParameters from './SecondStepParameters'
import ThirdStepFaq from './ThirdStepFaq'

const OfferRequestForm = () => {
  const { t } = useTranslation()
  const { userRole: userRoleFromRedux } = useAppSelector(
    (state) => state.appMain
  )
  const userRole = userRoleFromRedux as UserRole

  const [isDraft, setIsDraft] = useState(false)

  const {
    data,
    errors,
    isDirty,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit,
    handleErrors
  } = useForm({
    initialValues: {
      category: null as string | null,
      subject: null as string | null,
      proficiencyLevel: [] as ProficiencyLevelEnum[],
      description: '',
      languages: [] as LanguagesEnum[],
      priceRange: PRICE_RANGE.DEFAULT as [number, number],
      ...(userRole === UserRoleEnum.Tutor && {
        title: '',
        price: 0,
        FAQ: [{ question: '', answer: '' }]
      })
    } as OfferFormData,
    onSubmit: async (formData?: OfferFormData) => {
      if (!formData) return
      await new Promise((resolve) => setTimeout(resolve, 0))
      const payload = {
        ...formData,
        status: isDraft ? StatusEnum.Draft : StatusEnum.Pending,
        authorRole: userRole
      }
      console.log('Form submitted', payload)
    },
    validations
  })

  const handleCategoryChange = useCallback(
    (event: SyntheticEvent, value: CategoryNameInterface | null) => {
      handleNonInputValueChange('category', value?._id || null)
      handleNonInputValueChange('subject', null)
      handleNonInputValueChange('proficiencyLevel', [])
    },
    [handleNonInputValueChange]
  )

  const handleSubjectChange = useCallback(
    (event: SyntheticEvent, value: SubjectNameInterface | null) =>
      handleNonInputValueChange('subject', value?._id || null),
    [handleNonInputValueChange]
  )

  const handleRemoveLanguage = useCallback(
    (langToRemove: LanguagesEnum) =>
      handleNonInputValueChange(
        'languages',
        data.languages.filter((l) => l !== langToRemove)
      ),
    [data.languages, handleNonInputValueChange]
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
        getProficiencyLevelTranslationKey={getProficiencyLevelTranslationKey}
        handleBlur={handleBlur}
        handleCategoryChange={handleCategoryChange}
        handleErrors={handleErrors}
        handleNonInputValueChange={
          handleNonInputValueChange as (
            key: keyof OfferFormData,
            value: unknown
          ) => void
        }
        handleSubjectChange={handleSubjectChange}
        subjectService={subjectService}
        t={t}
        userRole={userRole}
      />

      <SecondStepParameters
        PRICE_RANGE={PRICE_RANGE}
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleNonInputValueChange={
          handleNonInputValueChange as (
            key: keyof OfferFormData,
            value: unknown
          ) => void
        }
        handleRemoveLanguage={handleRemoveLanguage}
        t={t}
        userRole={userRole}
      />

      {userRole === UserRoleEnum.Tutor && (
        <ThirdStepFaq
          data={data}
          errors={errors}
          handleBlur={handleBlur}
          handleErrors={handleErrors}
          handleNonInputValueChange={
            handleNonInputValueChange as (
              key: keyof OfferFormData,
              value: unknown
            ) => void
          }
          t={t}
          userRole={userRole}
        />
      )}

      {/* Footer */}
      <Box sx={styles.footer}>
        <AppButton
          disabled={!isFormValid(data, errors, isDirty, userRole)}
          fullWidth
          type='submit'
        >
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton fullWidth onClick={() => setIsDraft(true)} variant='tonal'>
          {t(`offerPage.createOffer.buttonTitles.addToDrafts`)}
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferRequestForm
