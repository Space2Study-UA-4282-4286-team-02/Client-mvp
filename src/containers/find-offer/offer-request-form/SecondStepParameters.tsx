import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TFunction } from 'i18next'

import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppSelect from '~/components/app-select/AppSelect'
import AppRange from '~/components/app-range/AppRange'

import {
  IMAGES,
  PRICE_RANGE as PRICE_RANGE_CONST,
  getLanguageTranslationKey
} from './OfferRequestForm.constants'
import {
  SelectFieldType,
  LanguagesEnum,
  OfferFormData,
  UserRoleEnum
} from '~/types'
import { styles } from './OfferRequestForm.styles'
import AppTextField from '~/components/app-text-field/AppTextField'

type Field = SelectFieldType<LanguagesEnum>

type PriceRangeType = typeof PRICE_RANGE_CONST

type Props = {
  t: TFunction
  userRole: UserRoleEnum
  data: OfferFormData
  errors: Partial<Record<keyof OfferFormData, string>>
  languages: LanguagesEnum[]
  isLanguageSelectOpen: boolean
  handleLanguageSelectClose: () => void
  handleLanguageSelectOpen: () => void
  handleLanguageChange: (v: LanguagesEnum | LanguagesEnum[]) => void
  renderLanguageChips: () => JSX.Element
  handleNonInputValueChange: (key: keyof OfferFormData, value: unknown) => void
  handleBlur: (
    key: keyof OfferFormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  PRICE_RANGE?: PriceRangeType
  getLanguageTranslationKey: (lang: LanguagesEnum) => string
}

const buildLanguageFields = (
  languages: LanguagesEnum[],
  t: TFunction
): Field[] =>
  languages.map((lang) => ({
    value: lang,
    title: t(getLanguageTranslationKey(lang))
  }))

export default function SecondStepParameters({
  t,
  userRole,
  data,
  errors,
  languages,
  isLanguageSelectOpen,
  handleLanguageSelectClose,
  handleLanguageSelectOpen,
  handleLanguageChange,
  renderLanguageChips,
  handleNonInputValueChange,
  handleBlur,
  PRICE_RANGE
}: Props) {
  return (
    <Box sx={styles.section}>
      <Box sx={styles.sectionHeader}>
        <Box alt='counter 2' component='img' src={IMAGES.counter2} />
        <Typography sx={styles.sectionTitle} variant='h6'>
          {t(`offerPage.title.secondStep.${userRole}`)}
        </Typography>
      </Box>

      <Box sx={styles.sectionContent}>
        {userRole === UserRoleEnum.Tutor && (
          <Box>
            <Typography sx={styles.sectionDescription}>
              {t(`offerPage.description.title.${userRole}`)}
            </Typography>
            <AppTextField
              errorMsg={errors.title ? t(errors.title) : undefined}
              fullWidth
              label={t('offerPage.labels.title')}
              onBlur={handleBlur('title')}
              onChange={(e) =>
                handleNonInputValueChange('title', e.target.value)
              }
              value={data.title || ''}
            />
          </Box>
        )}
        <Box>
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
            fields={buildLanguageFields(languages, t)}
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
            <Typography sx={styles.errorText}>{t(errors.languages)}</Typography>
          )}
          {data.languages.length > 0 && renderLanguageChips()}
        </Box>

        <Box>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.price.${userRole}`)}
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
            <Box
              sx={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
            >
              <Box sx={{ width: '200px' }}>
                <AppTextField
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
          <Box>
            <Typography sx={styles.sectionDescription}>
              Link your created course to the offer.
            </Typography>
            <AppSelect
              fields={[{ value: '', title: 'Course 1' }]}
              label={'Select a course'}
              setValue={() => {}}
              sx={{ mt: '6px' }}
              value=''
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
