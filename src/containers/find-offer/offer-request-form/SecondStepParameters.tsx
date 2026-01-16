import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { TFunction } from 'i18next'
import { useState, useCallback } from 'react'

import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppSelect from '~/components/app-select/AppSelect'
import AppChip from '~/components/app-chip/AppChip'

import {
  IMAGES,
  getLanguageTranslationKey,
  handleLanguageSelection,
  FIELD_LIMITS,
  OfferFormData
} from './OfferRequestForm.constants'
import {
  SelectFieldType,
  LanguagesEnum,
  UserRoleEnum,
  TypographyVariantEnum
} from '~/types'
import { styles } from './OfferRequestForm.styles'
import AppTextField from '~/components/app-text-field/AppTextField'

type Field = SelectFieldType<LanguagesEnum>

type Props = {
  t: TFunction
  userRole: UserRoleEnum
  data: OfferFormData
  errors: Partial<Record<keyof OfferFormData, string>>
  handleNonInputValueChange: (key: keyof OfferFormData, value: unknown) => void
  handleBlur: (
    key: keyof OfferFormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
}

const buildLanguageFields = (
  languages: LanguagesEnum[],
  t: TFunction
): Field[] =>
  languages.map((lang) => ({
    value: lang,
    title: t(getLanguageTranslationKey(lang))
  }))

const SecondStepParameters = ({
  t,
  userRole,
  data,
  errors,
  handleNonInputValueChange,
  handleBlur
}: Props) => {
  const handleRemoveLanguage = useCallback(
    (langToRemove: LanguagesEnum) =>
      handleNonInputValueChange(
        'languages',
        data.languages.filter((lang) => lang !== langToRemove)
      ),
    [data.languages, handleNonInputValueChange]
  )
  const languages = Object.values(LanguagesEnum)
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false)

  const handleLanguageSelectOpen = useCallback(
    () => setIsLanguageSelectOpen(true),
    []
  )

  const handleLanguageSelectClose = useCallback(
    () => setIsLanguageSelectOpen(false),
    []
  )

  const handleLanguageChange = useCallback(
    (newValue: LanguagesEnum | LanguagesEnum[]) => {
      const selectedArray = handleLanguageSelection(newValue)
      handleNonInputValueChange('languages', selectedArray)
      setIsLanguageSelectOpen(false)
    },
    [handleNonInputValueChange]
  )

  const renderLanguageChips = () => (
    <Box sx={styles.chips.container}>
      {data.languages.map((lang) => (
        <AppChip handleDelete={() => handleRemoveLanguage(lang)} key={lang}>
          {t(getLanguageTranslationKey(lang))}
        </AppChip>
      ))}
    </Box>
  )
  return (
    <Box sx={styles.section.wrapper}>
      <Box sx={styles.section.header}>
        <Box alt='counter 2' component='img' src={IMAGES.counter2} />
        <Typography
          sx={styles.section.title}
          variant={TypographyVariantEnum.H6}
        >
          {t(`offerPage.title.secondStep.${userRole}`)}
        </Typography>
      </Box>

      <Box sx={styles.section.content.compact}>
        <Box sx={styles.field.row.default}>
          <Typography sx={styles.section.description}>
            {t(`offerPage.description.title.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={errors.title ? t(errors.title) : undefined}
            fullWidth
            label={t('offerPage.labels.title')}
            maxLength={FIELD_LIMITS.TITLE_MAX_LENGTH}
            minRows={1}
            onBlur={handleBlur('title')}
            onChange={(e) => handleNonInputValueChange('title', e.target.value)}
            value={data.title || ''}
          />
        </Box>
        <Box sx={styles.field.row.default}>
          <Typography sx={styles.section.description}>
            {t(`offerPage.description.describe.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={errors.description ? t(errors.description) : undefined}
            fullWidth
            maxLength={
              userRole === UserRoleEnum.Student
                ? FIELD_LIMITS.DESCRIPTION_MAX_LENGTH.STUDENT
                : FIELD_LIMITS.DESCRIPTION_MAX_LENGTH.TUTOR
            }
            onBlur={handleBlur('description')}
            onChange={(e) =>
              handleNonInputValueChange('description', e.target.value)
            }
            placeholder={t(`offerPage.labels.describe.${userRole}`)}
            value={data.description}
          />
        </Box>

        <Box sx={styles.field.row.compact}>
          <Typography sx={styles.section.description}>
            {t(`offerPage.description.languages.${userRole}`)}
          </Typography>
          <AppSelect
            errorMsg={errors.languages ? t(errors.languages) : undefined}
            fields={buildLanguageFields(languages, t)}
            label={t('offerPage.labels.language')}
            multiple
            onBlur={handleBlur('languages')}
            onClose={handleLanguageSelectClose}
            onOpen={handleLanguageSelectOpen}
            open={isLanguageSelectOpen}
            setValue={handleLanguageChange}
            value={data.languages}
          />
          {data.languages.length > 0 && renderLanguageChips()}
        </Box>

        <Box sx={styles.field.row.default}>
          <Typography sx={styles.section.description}>
            {t(`offerPage.description.price.${userRole}`)}
          </Typography>
          <Box sx={styles.field.price.wrapper}>
            <AppTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box
                      component='img'
                      src={IMAGES.uahIcon}
                      sx={{ width: '15px' }}
                    />
                  </InputAdornment>
                )
              }}
              errorMsg={errors.price ? t(errors.price) : undefined}
              fullWidth
              onBlur={handleBlur('price')}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value, 10) : 0
                handleNonInputValueChange('price', value)
              }}
              type='number'
              value={data.price || ''}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SecondStepParameters
