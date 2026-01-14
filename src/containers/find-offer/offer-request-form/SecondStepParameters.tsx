import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { TFunction } from 'i18next'
import { useState, useCallback } from 'react'

import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppSelect from '~/components/app-select/AppSelect'
import AppRange from '~/components/app-range/AppRange'
import AppChip from '~/components/app-chip/AppChip'

import {
  IMAGES,
  PRICE_RANGE,
  PRICE_RANGE as PRICE_RANGE_CONST,
  getLanguageTranslationKey,
  handleLanguageSelection
} from './OfferRequestForm.constants'
import {
  SelectFieldType,
  LanguagesEnum,
  OfferFormData,
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
  handleRemoveLanguage: (lang: LanguagesEnum) => void
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
  handleRemoveLanguage,
  handleNonInputValueChange,
  handleBlur
}: Props) => {
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
    <Box sx={styles.chipContainer}>
      {data.languages.map((lang) => (
        <AppChip handleDelete={() => handleRemoveLanguage(lang)} key={lang}>
          {t(getLanguageTranslationKey(lang))}
        </AppChip>
      ))}
    </Box>
  )
  return (
    <Box sx={styles.section}>
      <Box sx={styles.sectionHeader}>
        <Box alt='counter 2' component='img' src={IMAGES.counter2} />
        <Typography sx={styles.sectionTitle} variant={TypographyVariantEnum.H6}>
          {t(`offerPage.title.secondStep.${userRole}`)}
        </Typography>
      </Box>

      <Box sx={styles.sectionContentCompact}>
        {userRole === UserRoleEnum.Tutor && (
          <Box sx={styles.fieldRow}>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.title.${userRole}`)}
            </Typography>
            <AppTextArea
              errorMsg={errors.title ? t(errors.title) : undefined}
              fullWidth
              label={t('offerPage.labels.title')}
              maxLength={100}
              minRows={1}
              onBlur={handleBlur('title')}
              onChange={(e) =>
                handleNonInputValueChange('title', e.target.value)
              }
              value={data.title || ''}
            />
          </Box>
        )}
        <Box sx={styles.fieldRow}>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.describe.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={errors.description ? t(errors.description) : undefined}
            fullWidth
            maxLength={userRole === UserRoleEnum.Student ? 2000 : 1000}
            onBlur={handleBlur('description')}
            onChange={(e) =>
              handleNonInputValueChange('description', e.target.value)
            }
            placeholder={t(`offerPage.labels.describe.${userRole}`)}
            value={data.description}
          />
        </Box>

        <Box sx={styles.fieldRowCompact}>
          <Typography sx={styles.sectionDescription}>
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

        <Box sx={styles.fieldRow}>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.price.${userRole}`)}
            {userRole === UserRoleEnum.Student && (
              <span> {t(`common.uah`)}</span>
            )}
          </Typography>
          {userRole === UserRoleEnum.Student && (
            <AppRange
              max={PRICE_RANGE?.MAX ?? PRICE_RANGE_CONST.MAX}
              min={PRICE_RANGE?.MIN ?? PRICE_RANGE_CONST.MIN}
              onChange={(newRange) =>
                handleNonInputValueChange('priceRange', newRange)
              }
              value={data.priceRange}
            />
          )}
          {userRole === UserRoleEnum.Tutor && (
            <Box sx={styles.priceInputWrapper}>
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
                  const value = e.target.value
                    ? parseInt(e.target.value, 10)
                    : 0
                  handleNonInputValueChange('price', value)
                }}
                type='number'
                value={data.price || ''}
              />
            </Box>
          )}
          {errors.priceRange && (
            <Typography sx={styles.errorText}>
              {t(errors.priceRange)}
            </Typography>
          )}
          {userRole === UserRoleEnum.Student && (
            <Typography sx={styles.tutorsCount}>
              0 tutors fit your needs
            </Typography>
          )}
        </Box>

        {userRole === UserRoleEnum.Tutor && (
          <Box sx={styles.fieldRow}>
            <Typography sx={styles.sectionDescription}>
              Link your created course to the offer.
            </Typography>
            <AppSelect
              fields={[{ value: '', title: 'Course 1' }]}
              label={'Select a course'}
              setValue={() => {}}
              value=''
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SecondStepParameters
