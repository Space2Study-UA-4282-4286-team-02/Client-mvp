import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { createFilterOptions } from '@mui/material/Autocomplete'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { LanguagesEnum } from '~/types'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const INITIAL_VISIBLE_COUNT = 6
const LOAD_MORE_COUNT = 6

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const languageLabel = tutorStepLabels[2]
  const language = stepData[languageLabel] || ''

  const languages = Object.values(LanguagesEnum)

  const languageOptions = useMemo(() => {
    return languages.map((languageValue) => {
      const translationKey = `common.languages.${languageValue.toLowerCase()}`
      return {
        value: languageValue,
        label: t(translationKey)
      }
    })
  }, [languages, t])

  const selectedLanguage = useMemo(() => {
    if (!language) return null
    return languageOptions.find((option) => option.value === language) || null
  }, [language, languageOptions])

  const handleChange = (_, newValue) => {
    handleStepData(languageLabel, newValue?.value || '')
  }

  const filterOptions = useCallback((options, state) => {
    const defaultFilter = createFilterOptions()
    return defaultFilter(options, state)
  }, [])

  const handleListboxScroll = useCallback(
    (event) => {
      const listboxNode = event.currentTarget
      const { scrollTop, scrollHeight, clientHeight } = listboxNode

      if (
        scrollHeight - scrollTop - clientHeight < 50 &&
        visibleCount < languageOptions.length
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, languageOptions.length)
        )
      }
    },
    [visibleCount, languageOptions.length]
  )

  const visibleOptions = useMemo(() => {
    return languageOptions.slice(0, visibleCount)
  }, [languageOptions, visibleCount])

  const handleInputChange = useCallback(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [])

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography
            sx={{
              marginBottom: '20px',
              lineHeight: '120%'
            }}
            variant={isMobile ? 'body2' : 'subtitle1'}
          >
            {t('becomeTutor.language.title')}
          </Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <AppAutoComplete
            ListboxProps={{
              onScroll: handleListboxScroll,
              style: { maxHeight: 200 }
            }}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleChange}
            onInputChange={handleInputChange}
            options={visibleOptions}
            textFieldProps={{
              label: t('becomeTutor.language.autocompleteLabel')
            }}
            value={selectedLanguage}
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
