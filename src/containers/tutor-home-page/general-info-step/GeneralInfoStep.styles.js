import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { md: 'row' },
    justifyContent: { md: 'space-between', xs: 'center' },
    alignItems: 'center',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  imgContainer: {
    width: '100%',
    maxWidth: { md: '50%', lg: '450px' },
    mt: { md: '0' },
    mb: { md: '60px' },
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center'
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    maxWidth: '400px'
  },
  mobileImgContainer: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'center',
    mb: '24px',
    width: '100%',
    '& img': {
      maxWidth: '200px'
    }
  },
  description: {
    typography: 'body1',
    color: 'primary.900',
    mb: { xs: '20px' },
    textAlign: { xs: 'left' },
    lineHeight: '1.5'
  },
  rightBox: {
    width: '100%',
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: { xs: '15px', sm: 0 },
    m: { md: 0, xs: '0 auto' }
  },
  rowContainer: {
    display: 'flex',
    gap: '15px',
    flexDirection: { xs: 'column', sm: 'row' },
    width: '100%',
    alignItems: 'flex-start'
  },
  professionalStatusInput: {
    mb: '15px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      padding: '10px',
      '& fieldset': {
        borderColor: '#c0cacc'
      }
    },
    '& .MuiFormHelperText-root': {
      textAlign: 'left',
      marginLeft: '0',
      color: '#78909c',
      marginTop: '4px',
      fontSize: '12px'
    }
  },
  requiredInfo: {
    color: 'primary.900',
    lineHeight: '1.5',
    mb: '60px'
  }
}
