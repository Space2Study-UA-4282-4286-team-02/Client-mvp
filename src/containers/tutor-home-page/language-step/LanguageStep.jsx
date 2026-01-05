import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'

import { LanguagesEnum } from '~/types'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const languageLabel = tutorStepLabels[2]
  const language = stepData[languageLabel] || ''

  const handleChange = (event) => {
    handleStepData(languageLabel, event.target.value)
  }

  const languages = Object.values(LanguagesEnum)

  const languagesMenuItems = languages.map((languageValue) => {
    const translationKey = `common.languages.${languageValue.toLowerCase()}`

    return (
      <MenuItem key={languageValue} value={languageValue}>
        {t(translationKey)}
      </MenuItem>
    )
  })

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
            {t('becomeTutor.languages.title')}
          </Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <FormControl sx={{ minWidth: '100%' }}>
            <InputLabel id='your-native-language' sx={{ lineHeight: 1 }}>
              {t('becomeTutor.languages.autocompleteLabel')}
            </InputLabel>
            <Select
              id='your-native-language'
              label={t('becomeTutor.languages.autocompleteLabel')}
              labelId='your-native-language'
              onChange={handleChange}
              value={language}
            >
              {languagesMenuItems}
            </Select>
          </FormControl>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
