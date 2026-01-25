import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'
import AppTextField from '~/components/app-text-field/AppTextField'
import { styles } from '~/components/select-location/SelectLocation.styles'
import { useLazyGetCitiesQuery } from '~/services/locationService'
import { filterOptions } from '~/utils/autocompleteFilters'
import { useTranslation } from 'react-i18next'

export default function CitySelect({ countryCode, city, setCity }) {
  const { t } = useTranslation()
  const [trigger, { data: cities, isLoading }] = useLazyGetCitiesQuery()

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (countryCode) {
      trigger(countryCode)
    }
  }, [countryCode, trigger])

  useEffect(() => {
    setInputValue(city || '')
  }, [city])

  return (
    <Autocomplete
      ListboxProps={{
        sx: {
          maxHeight: { xs: '170px', sm: '145px' }
        }
      }}
      disabled={!countryCode}
      filterOptions={filterOptions}
      fullWidth
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name || ''
      }
      id='city-select'
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) =>
        option.name === (value?.name || value)
      }
      label={t('common.labels.city')}
      loading={isLoading}
      onChange={(_event, newValue) => {
        setCity(newValue ? newValue.name : '')
      }}
      onFocus={() => countryCode && !cities && trigger(countryCode)}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      options={cities || []}
      renderInput={(params) => (
        <AppTextField
          {...params}
          fullWidth
          label='City'
          placeholder={countryCode ? 'City' : 'Select country first'}
          required
        />
      )}
      renderOption={(props, option, { index }) => {
        const { ...optionProps } = props
        return (
          <li {...optionProps} key={`${option.name}-${index}`}>
            {option.name}
          </li>
        )
      }}
      sx={styles.autocomplete}
      value={cities?.find((c) => c.name === city) || null}
    />
  )
}
