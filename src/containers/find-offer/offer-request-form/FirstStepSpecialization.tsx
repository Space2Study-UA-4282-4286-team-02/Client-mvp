import { SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TFunction } from 'i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { IMAGES } from './OfferRequestForm.constants'
import { styles } from './OfferRequestForm.styles'

type FormData = {
  category: string | null
  subject: string | null
  level: string
  description: string
  languages: string[]
  priceRange: [number, number]
}

type Props = {
  t: TFunction
  userRole: string
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  proficiencyLevels: string[]
  handleBlur: (
    key: keyof FormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (key: keyof FormData, value: unknown) => void
  handleCategoryChange: (
    event: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => void
  handleSubjectChange: (
    event: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => void
  categoryService: typeof categoryService
  subjectService: typeof subjectService
}

export default function FirstStepSpecialization({
  t,
  userRole,
  data,
  errors,
  proficiencyLevels,
  handleBlur,
  handleNonInputValueChange,
  handleCategoryChange,
  handleSubjectChange,
  categoryService,
  subjectService
}: Props) {
  return (
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
          <Box
            onBlur={handleBlur('level')}
            sx={{ display: 'flex', flexDirection: 'column' }}
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
                    sx={{ color: errors.level ? '#F54636' : undefined }}
                  />
                }
                key={level}
                label={level}
                sx={styles.checkboxLabel}
              />
            ))}
          </Box>
          {errors.level && (
            <Typography sx={styles.errorText}>{t(errors.level)}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
