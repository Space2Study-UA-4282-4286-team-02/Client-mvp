import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useStepContext } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { useGetMeQuery } from '~/services/auth-service'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import CitySelect from '~/components/select-location/CitySelect'
import CountrySelect from '~/components/select-location/CountrySelect'

const GeneralInfoStep = ({ btnsBox, isUserFetched, setIsUserFetched }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const generalInfoLabel = tutorStepLabels[0]
  const [formData, setFormData] = useState(
    stepData[generalInfoLabel]?.data || {}
  )

  const {
    firstName = '',
    lastName = '',
    country = '',
    countryCode = '',
    city = '',
    professionalSummary = ''
  } = formData

  const handleLocalChange = (key, value) => {
    setFormData((prev) => {
      if (key === 'country') {
        return {
          ...prev,
          country: value?.name || '',
          countryCode: value?.iso2 || '',
          city: ''
        }
      }
      return {
        ...prev,
        [key]: value
      }
    })
  }

  const { data: user } = useGetMeQuery()

  const saveDataToContext = useCallback(() => {
    handleStepData(generalInfoLabel, formData)
  }, [generalInfoLabel, formData, handleStepData])

  useEffect(() => {
    if (user && !isUserFetched) {
      const initialData = {
        ...stepData[generalInfoLabel]?.data,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      }
      setFormData(initialData)
      setIsUserFetched(true)
    }
  }, [user, isUserFetched, setIsUserFetched, stepData, generalInfoLabel])

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rightBox}>
        <Typography sx={styles.description}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box sx={styles.mobileImgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
        <Box sx={styles.rowContainer}>
          <AppTextField
            autoComplete='given-name'
            autoFocus
            data-testid='firstName'
            error={firstName.length >= 30}
            fullWidth
            helperText={
              firstName.length >= 30
                ? t('This field cannot be longer than 30 characters')
                : ' '
            }
            inputProps={{
              maxLength: 30,
              sx: {
                color: '#607d8b'
              }
            }}
            label={t('common.labels.firstName')}
            onChange={(e) => {
              handleLocalChange('firstName', e.target.value)
            }}
            required
            sx={{ flex: 1 }}
            type='text'
            value={firstName}
          />
          <AppTextField
            autoComplete='family-name'
            data-testid='lastName'
            error={lastName.length >= 30}
            fullWidth
            helperText={
              lastName.length >= 30
                ? t('This field cannot be longer than 30 characters')
                : ' '
            }
            inputProps={{
              maxLength: 30,
              sx: {
                color: '#607d8b'
              }
            }}
            label={t('common.labels.lastName')}
            onChange={(e) => {
              handleLocalChange('lastName', e.target.value)
            }}
            required
            sx={{ flex: 1 }}
            type='text'
            value={lastName}
          />
        </Box>
        <Box sx={styles.rowContainer}>
          <CountrySelect
            setCountry={(countryObj) =>
              handleLocalChange('country', countryObj)
            }
            value={country}
          />
          <CitySelect
            city={city}
            countryCode={countryCode}
            setCity={(val) => {
              handleLocalChange('city', val)
            }}
          />
        </Box>
        <AppTextField
          fullWidth
          helperText={`${professionalSummary?.length || 0}/100`}
          inputProps={{ maxLength: 100, sx: { color: '#607d8b' } }}
          multiline
          onChange={(e) => {
            handleLocalChange('professionalSummary', e.target.value)
          }}
          placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
          rows={4}
          sx={styles.professionalStatusInput}
          value={professionalSummary}
        />
        <Typography sx={styles.requiredInfo} variant='caption'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox && React.cloneElement(btnsBox, { onClick: saveDataToContext })}{' '}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
