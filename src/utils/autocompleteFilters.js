import { createFilterOptions } from '@mui/material/Autocomplete'

export const filterOptions = createFilterOptions({
  matchFrom: 'start',
  ignoreCase: true,
  trim: true
})
