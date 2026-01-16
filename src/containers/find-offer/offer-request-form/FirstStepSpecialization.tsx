import { SyntheticEvent, useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TFunction } from 'i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import {
  CategoryNameInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum,
  TypographyVariantEnum
} from '~/types'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import {
  getProficiencyLevelTranslationKey,
  IMAGES,
  OfferFormData
} from './OfferRequestForm.constants'
import { styles } from './OfferRequestForm.styles'

type Props = {
  t: TFunction
  userRole: string
  data: OfferFormData
  errors: Partial<Record<keyof OfferFormData, string>>
  handleBlur: (
    key: keyof OfferFormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (key: keyof OfferFormData, value: unknown) => void
  handleErrors: (key: keyof OfferFormData, error: string) => void
}

const FirstStepSpecialization = ({
  t,
  userRole,
  data,
  errors,
  handleBlur,
  handleNonInputValueChange,
  handleErrors
}: Props) => {
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
  const proficiencyLevels = useMemo(
    () => Object.values(ProficiencyLevelEnum),
    []
  )

  const handleProficiencyLevelChange = (
    level: ProficiencyLevelEnum,
    isChecked: boolean
  ) => {
    const currentLevels = Array.isArray(data.proficiencyLevel)
      ? [...data.proficiencyLevel]
      : []

    if (isChecked) {
      if (!currentLevels.includes(level)) {
        currentLevels.push(level)
      }
    } else {
      const index = currentLevels.indexOf(level)
      if (index > -1) {
        currentLevels.splice(index, 1)
      }
    }

    if (currentLevels.length > 0) {
      handleErrors('proficiencyLevel', '')
    } else {
      handleErrors('proficiencyLevel', 'offerPage.errorMessages.level')
    }

    handleNonInputValueChange('proficiencyLevel', currentLevels)
  }

  return (
    <Box sx={styles.section.wrapper}>
      <Box sx={styles.section.header}>
        <Box alt='counter 1' component='img' src={IMAGES.counter1} />
        <Typography
          sx={styles.section.title}
          variant={TypographyVariantEnum.H6}
        >
          {t(`offerPage.title.firstStep.${userRole}`)}
        </Typography>
      </Box>

      <Box sx={styles.section.content.default}>
        <Box sx={styles.field.row.default}>
          <Typography sx={styles.section.description}>
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
        </Box>
        <Box sx={styles.field.row.default}>
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
        </Box>

        <Box sx={styles.field.row.default}>
          <Typography sx={styles.section.description}>
            {t(`offerPage.description.level.${userRole}`)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {proficiencyLevels.map((level) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={(Array.isArray(data.proficiencyLevel)
                      ? data.proficiencyLevel
                      : []
                    ).includes(level)}
                    onChange={(e) =>
                      handleProficiencyLevelChange(level, e.target.checked)
                    }
                    sx={{
                      color: errors.proficiencyLevel ? '#F54636' : undefined
                    }}
                  />
                }
                key={level}
                label={t(getProficiencyLevelTranslationKey(level))}
                sx={styles.checkbox.label}
              />
            ))}
          </Box>
          {errors.proficiencyLevel && (
            <Typography
              sx={{ color: 'error.main', fontSize: '12px', mt: '4px' }}
            >
              {t(errors.proficiencyLevel)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default FirstStepSpecialization
