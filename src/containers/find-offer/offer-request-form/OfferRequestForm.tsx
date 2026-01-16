import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'

import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'

import {
  ProficiencyLevelEnum,
  LanguagesEnum,
  StatusEnum,
  UserRole,
  ComponentEnum,
  ButtonTypeEnum,
  TypographyVariantEnum,
  ButtonVariantEnum
} from '~/types'

import { styles } from './OfferRequestForm.styles'
import {
  IMAGES,
  validations,
  isFormValid,
  OfferFormData
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
      title: '',
      price: 0,
      FAQ: [{ question: '', answer: '' }]
    } as OfferFormData,
    onSubmit: async (formData?: OfferFormData) => {
      if (!formData) return
      await new Promise((resolve) => setTimeout(resolve, 0))
      const payload = {
        ...formData,
        status: StatusEnum.Active,
        authorRole: userRole
      }
      console.log('Form submitted', payload)
    },
    validations,
    submitWithData: true
  })

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      {/* Header */}
      <Box sx={styles.header.wrapper}>
        <Box alt='leak_add' component='img' src={IMAGES.leakAdd} />
        <Typography sx={styles.header.title} variant={TypographyVariantEnum.H5}>
          {t(`offerPage.createOffer.title.${userRole}`)}
        </Typography>
      </Box>
      <Typography sx={styles.titleDescription.wrapper}>
        {t(`offerPage.createOffer.description.${userRole}`)}
      </Typography>

      <FirstStepSpecialization
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

      <SecondStepParameters
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleNonInputValueChange={
          handleNonInputValueChange as (
            key: keyof OfferFormData,
            value: unknown
          ) => void
        }
        t={t}
        userRole={userRole}
      />

      <ThirdStepFaq
        data={data}
        errors={errors}
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

      {/* Footer */}
      <Box sx={styles.footer}>
        <AppButton
          disabled={!isFormValid(data, errors, isDirty)}
          fullWidth
          type={ButtonTypeEnum.Submit}
        >
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton
          fullWidth
          onClick={() => {}}
          variant={ButtonVariantEnum.Tonal}
        >
          {t(`offerPage.createOffer.buttonTitles.addToDrafts`)}
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferRequestForm
