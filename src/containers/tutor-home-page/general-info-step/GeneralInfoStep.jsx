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
import * as validators from '~/utils/validations/generalInfo'

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

  const [wasFocused, setWasFocused] = useState({
    firstName: false,
    lastName: false,
    country: false,
    city: false
  })

  const handleBlur = (field) => {
    setWasFocused((prev) => ({ ...prev, [field]: true }))
  }

  const errors = {
    firstName: validators.firstName(firstName),
    lastName: validators.lastName(lastName),
    country: validators.country(country),
    city: validators.city(city),
    professionalSummary: validators.professionalSummary(professionalSummary)
  }

  const requiredFields = ['firstName', 'lastName', 'country', 'city']

  const hasRequiredFieldsErrors = requiredFields.some(
    (key) => errors[key] !== undefined && errors[key] !== ''
  )

  const isNextDisabled = hasRequiredFieldsErrors

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
            FormHelperTextProps={{ sx: { minHeight: '20px', lineHeight: '1' } }}
            autoComplete='given-name'
            autoFocus
            data-testid='firstName'
            error={wasFocused.firstName && !!errors.firstName}
            fullWidth
            helperText={(wasFocused.firstName && t(errors.firstName)) || ' '}
            inputProps={{
              maxLength: 30,
              sx: {
                color: '#607d8b'
              }
            }}
            label={t('common.labels.firstName')}
            onBlur={() => handleBlur('firstName')}
            onChange={(e) => {
              handleLocalChange('firstName', e.target.value)
            }}
            required
            sx={{
              flex: 1,
              minWidth: 0,
              width: '100%'
            }}
            type='text'
            value={firstName}
          />
          <AppTextField
            FormHelperTextProps={{ sx: { minHeight: '20px', lineHeight: '1' } }}
            autoComplete='family-name'
            data-testid='lastName'
            error={wasFocused.lastName && !!errors.lastName}
            fullWidth
            helperText={(wasFocused.lastName && t(errors.lastName)) || ' '}
            inputProps={{
              maxLength: 30,
              sx: {
                color: '#607d8b'
              }
            }}
            label={t('common.labels.lastName')}
            onBlur={() => handleBlur('lastName')}
            onChange={(e) => {
              handleLocalChange('lastName', e.target.value)
            }}
            required
            sx={{
              flex: 1,
              minWidth: 0,
              width: '100%'
            }}
            type='text'
            value={lastName}
          />
        </Box>
        <Box sx={styles.rowContainer}>
          <CountrySelect
            error={wasFocused.country && !!errors.country}
            helperText={
              wasFocused.country && !country
                ? t('common.errorMessages.emptyField')
                : ' '
            }
            onBlur={() => handleBlur('country')}
            setCountry={(countryObj) =>
              handleLocalChange('country', countryObj)
            }
            value={country}
          />
          <CitySelect
            city={city}
            countryCode={countryCode}
            error={wasFocused.city && !!errors.city}
            helperText={
              wasFocused.city && !city
                ? t('common.errorMessages.emptyField')
                : ' '
            }
            onBlur={() => handleBlur('city')}
            setCity={(val) => {
              handleLocalChange('city', val)
            }}
          />
        </Box>
        <AppTextField
          error={!!errors.professionalSummary}
          fullWidth
          helperText={
            <Box component='span'>
              <span>
                {typeof errors.professionalSummary === 'string'
                  ? t(errors.professionalSummary)
                  : ' '}
              </span>
              <span
                style={{
                  color: professionalSummary.length >= 100 ? 'red' : 'inherit'
                }}
              >
                {`${professionalSummary.length}/100`}
              </span>
            </Box>
          }
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
        {btnsBox &&
          React.cloneElement(btnsBox, {
            onClick: saveDataToContext,
            disabled: isNextDisabled
          })}{' '}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
