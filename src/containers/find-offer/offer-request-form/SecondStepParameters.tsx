import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TFunction } from 'i18next'

import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppSelect from '~/components/app-select/AppSelect'
import AppRange from '~/components/app-range/AppRange'

import {
  IMAGES,
  PRICE_RANGE as PRICE_RANGE_CONST
} from './OfferRequestForm.constants'
import { SelectFieldType } from '~/types/components/appSelect/appSelect.types'
import { styles } from './OfferRequestForm.styles'

type FormData = {
  category: string | null
  subject: string | null
  level: string
  description: string
  languages: string[]
  priceRange: [number, number]
}

type Field = SelectFieldType<string>

type PriceRangeType = typeof PRICE_RANGE_CONST

type Props = {
  t: TFunction
  userRole: string
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  languages: string[]
  buildLanguageFields: (langs: string[]) => Field[]
  isLanguageSelectOpen: boolean
  handleLanguageSelectClose: () => void
  handleLanguageSelectOpen: () => void
  handleLanguageChange: (v: string | string[]) => void
  renderLanguageChips: () => JSX.Element
  handleNonInputValueChange: (key: keyof FormData, value: unknown) => void
  handleBlur: (
    key: keyof FormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  PRICE_RANGE?: PriceRangeType
  tutorsCount?: number
}

export default function SecondStepParameters({
  t,
  userRole,
  data,
  errors,
  languages,
  buildLanguageFields,
  isLanguageSelectOpen,
  handleLanguageSelectClose,
  handleLanguageSelectOpen,
  handleLanguageChange,
  renderLanguageChips,
  handleNonInputValueChange,
  handleBlur,
  PRICE_RANGE,
  tutorsCount
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
        <Box>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.describe.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={errors.description ? t(errors.description) : undefined}
            fullWidth
            maxLength={2000}
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
            <Typography sx={styles.errorText}>{t(errors.languages)}</Typography>
          )}
          {data.languages.length > 0 && renderLanguageChips()}
        </Box>

        <Box>
          <Typography sx={styles.sectionDescription}>
            {t(`offerPage.description.price.${userRole}`)}
          </Typography>
          <AppRange
            max={PRICE_RANGE?.MAX ?? PRICE_RANGE_CONST.MAX}
            min={PRICE_RANGE?.MIN ?? PRICE_RANGE_CONST.MIN}
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
  )
}
