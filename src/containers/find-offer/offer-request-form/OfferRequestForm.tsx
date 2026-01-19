import { useState } from 'react'
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
  UserRoleEnum,
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
import { offerService, CreateOfferPayload } from '~/services/offer-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'

type Props = {
  closeDrawer: () => void
}

const OfferRequestForm = ({ closeDrawer }: Props) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setAlert } = useSnackBarContext()

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
      proficiencyLevel: '' as ProficiencyLevelEnum | '',
      description: '',
      languages: [] as LanguagesEnum[],
      title: '',
      price: 0,
      FAQ: [{ question: '', answer: '' }]
    } as OfferFormData,
    onSubmit: async (formData?: OfferFormData) => {
      if (
        !formData ||
        !userRole ||
        !formData.subject ||
        !formData.category ||
        !formData.proficiencyLevel
      ) {
        return
      }
      setIsSubmitting(true)

      const payload: CreateOfferPayload = {
        title: formData.title || '',
        price: formData.price || 0,
        proficiencyLevel: formData.proficiencyLevel,
        description: formData.description,
        languages: formData.languages,
        subject: formData.subject,
        category: formData.category,
        FAQ: formData.FAQ || [],
        status: StatusEnum.Active,
        authorRole: userRole as UserRoleEnum
      }

      try {
        // await new Promise((r) => setTimeout(r, 2000))
        // throw { data: { code: 'TEST_ERROR' } } as any
        await offerService.createOffer(payload)
        setAlert({
          severity: snackbarVariants.success,
          message: t(`offerPage.createOffer.successMessage.${userRole}`)
        })
        closeDrawer()
      } catch (error) {
        const errorData = error as { data: { code: string } }
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${errorData.data.code}`
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    validations,
    submitWithData: true
  })

  const commonStepProps = {
    data,
    errors,
    t,
    userRole: userRole as UserRoleEnum,
    handleNonInputValueChange: handleNonInputValueChange as (
      key: keyof OfferFormData,
      value: unknown
    ) => void
  }

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
        {...commonStepProps}
        handleBlur={handleBlur}
        handleErrors={handleErrors}
      />

      <SecondStepParameters {...commonStepProps} handleBlur={handleBlur} />

      <ThirdStepFaq {...commonStepProps} handleErrors={handleErrors} />

      {/* Footer */}
      <Box sx={styles.footer}>
        <AppButton
          disabled={!isFormValid(data, errors, isDirty) || isSubmitting}
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
