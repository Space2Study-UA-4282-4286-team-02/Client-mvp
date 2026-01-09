import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete, Box } from '@mui/material'
import { useLazyGetCountriesQuery } from '~/services/locationService'
import AppTextField from '~/components/app-text-field/AppTextField'
import { styles } from './SelectLocation.styles'
import { filterOptions } from '~/utils/autocompleteFilters'

export default function CountrySelect({
  setCountry,
  value,
  error,
  helperText,
  onBlur
}) {
  const { t } = useTranslation()
  const [trigger, { data: countries, isLoading }] = useLazyGetCountriesQuery()

  const selectedValue = useMemo(() => {
    if (!value) return null

    const countryName =
      typeof value === 'object' ? value.name?.name || value.name : value

    const found = countries?.find((c) => c.name === countryName)
    return found || { name: countryName }
  }, [countries, value])

  const handleFocus = () => {
    if (!countries) {
      trigger()
    }
  }

  return (
    <Autocomplete
      ListboxProps={{
        sx: {
          maxHeight: { xs: '170px', sm: '145px' }
        }
      }}
      filterOptions={filterOptions}
      fullWidth
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        return option?.name || ''
      }}
      id='country-select'
      isOptionEqualToValue={(option, val) => {
        const optionName = option?.name || option
        const valName = val?.name || val
        return optionName === valName
      }}
      label={t('common.labels.country')}
      loading={isLoading}
      onChange={(_event, newValue) => {
        setCountry(newValue)
      }}
      onFocus={handleFocus}
      options={countries || []}
      renderInput={(params) => (
        <AppTextField
          {...params}
          error={error}
          fullWidth
          helperText={helperText}
          label={t('common.labels.country')}
          onBlur={onBlur}
          placeholder={t('common.labels.country')}
          required
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return (
          <Box
            component='li'
            key={key}
            sx={{ '& > img': { mr: 2, flexShrink: 0 }, fontSize: '14px' }}
            {...optionProps}
          >
            <img
              alt=''
              loading='lazy'
              src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
              width='20'
            />
            {option.name} ({option.iso2})
          </Box>
        )
      }}
      sx={styles.autocomplete}
      value={selectedValue}
    />
  )
}
