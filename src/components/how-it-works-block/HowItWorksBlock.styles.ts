export const styles = {
  container: {
    flexDirection: 'column',
    gap: { xs: '20px', sm: '32px', md: '48px' },
    pt: { xs: '30px', sm: '32px', md: '64px' },
    pb: { xs: '20px', sm: '24px', md: '48px' },
    backgroundColor: '#FCFFFB',
    borderRadius: {
      xs: '16px',
      md: '20px'
    },
    pl: { xs: '16px', sm: '24px', md: '45.5px' },
    pr: { xs: '16px', sm: '24px', md: '45.5px' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      gap: '8px'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' }
    }
  },
  button: {
    p: '16px 32px'
  }
}
