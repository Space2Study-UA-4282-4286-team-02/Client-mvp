import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography, TextField } from '@mui/material'

import AppSelect from '~/components/app-select/AppSelect'
import { styles } from './EnrollOfferModal.styles'
import { EnrollOfferModalProps } from '~/types'
import OfferCard from '~/components/offer-card/OfferCard'

const EnrollOfferModal: FC<EnrollOfferModalProps> = ({
  closeModal,
  offer,
  withMentorCard
}) => {
  const { t } = useTranslation()
  const [level, setLevel] = useState('')
  const [language, setLanguage] = useState('')
  const [info, setInfo] = useState('')

  const levelFields = useMemo(
    () => [
      { value: 'Beginner', title: 'common.levels.beginner' },
      { value: 'Intermediate', title: 'common.levels.intermediate' },
      { value: 'Advanced', title: 'common.levels.advanced' },
      { value: 'Professional', title: 'common.levels.professional' }
    ],
    []
  )

  const languageFields = useMemo(
    () => [
      { value: 'Ukrainian', title: 'common.languages.ukrainian' },
      { value: 'English', title: 'common.languages.english' },
      { value: 'Polish', title: 'common.languages.polish' },
      { value: 'German', title: 'common.languages.german' },
      { value: 'French', title: 'common.languages.french' },
      { value: 'Spanish', title: 'common.languages.spanish' },
      { value: 'Arabic', title: 'common.languages.arabic' }
    ],
    []
  )

  const handleSendRequest = () => {
    closeModal()
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.offerPart}>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.title} variant='h4'>
            {t('offerDetailsPage.enrollOffer.title')}
          </Typography>
          <Typography sx={styles.subtitle}>
            {t('offerDetailsPage.enrollOffer.description')}
          </Typography>
        </Box>

        {withMentorCard && (
          <Box>
            <OfferCard offer={offer} sx={styles.mentorCard} />
          </Box>
        )}
      </Box>

      <Box sx={styles.form}>
        <Box sx={styles.selectBlock}>
          <Typography sx={styles.chooseDesc} variant='body1'>
            {t('offerDetailsPage.enrollOffer.inputs.level')}{' '}
          </Typography>

          <AppSelect
            fields={levelFields}
            label={t('offerDetailsPage.enrollOffer.labels.level')}
            setValue={setLevel}
            value={level}
          />
        </Box>

        <Box sx={styles.selectBlock}>
          <Typography sx={styles.chooseDesc} variant='body1'>
            {t('offerDetailsPage.enrollOffer.inputs.language')}{' '}
          </Typography>

          <AppSelect
            fields={languageFields}
            label={t('offerDetailsPage.enrollOffer.labels.language')}
            setValue={setLanguage}
            value={language}
          />
        </Box>

        <Box sx={styles.selectBlock}>
          <Typography sx={styles.chooseDesc} variant='body1'>
            {t('offerDetailsPage.enrollOffer.inputs.info')}
          </Typography>

          <TextField
            FormHelperTextProps={{
              sx: {
                textAlign: 'right',
                mr: 0,
                color: 'primary.300',
                fontSize: '14px'
              }
            }}
            fullWidth
            helperText={`${info.length}/1000`}
            inputProps={{ maxLength: 1000 }}
            label={t('offerDetailsPage.enrollOffer.labels.info')}
            multiline
            onChange={(e) => setInfo(e.target.value)}
            rows={3}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'primary.500'
              }
            }}
            value={info}
          />
        </Box>

        <Button
          onClick={handleSendRequest}
          sx={styles.submitBtn}
          variant='contained'
        >
          {t('offerDetailsPage.enrollOffer.requestBtn')}
        </Button>
      </Box>
    </Box>
  )
}

export default EnrollOfferModal
