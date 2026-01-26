export const styles = {
  autocomplete: {
    flex: 1,

    '&.Mui-disabled': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#f5f5f5',
        '& fieldset': {
          borderColor: '#d1d1d1 !important'
        }
      },
      '& .MuiInputLabel-root': {
        color: '#b0bec5'
      },
      '& .MuiOutlinedInput-input': {
        WebkitTextFillColor: '#b0bec5'
      }
    },
    '& .MuiOutlinedInput-root': {
      padding: '5px',
      borderRadius: '4px',
      '& .MuiOutlinedInput-input': {
        color: '#607d8b'
      },
      '&.MuiFormLabel-filled': {
        backgroundColor: '#ebf1ff'
      },
      '& fieldset': {
        borderColor: '#c0cacc'
      },
      '&.Mui-focused fieldset': {
        borderWidth: '2px !important',
        borderColor: '#607d8b'
      }
    },
    '& .MuiInputLabel-root': {
      fontSize: '16px',
      '&.Mui-focused': {
        color: '#000000 !important'
      }
    },
    '& .MuiAutocomplete-listbox': {
      maxHeight: '192px',
      '& .MuiAutocomplete-option': {
        minHeight: '48px'
      }
    }
  }
}
