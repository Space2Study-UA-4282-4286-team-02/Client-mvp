export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  input: {
    maxWidth: '343px'
  },
  signupButton: {
    width: '100%',
    py: '14px'
  },
  terms: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    mb: '20px'
  },
  termsLink: {
    cursor: 'pointer',
    color: 'primary.900',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
      textUnderlineOffset: '1.5px'
    },

    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    },
    mb: '20px'
  }
}
