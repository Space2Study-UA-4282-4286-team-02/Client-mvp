import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  section: {
    padding: {
      xs: '30px 16px',
      sm: '50px 16px',
      md: '70px 16px',
      lg: '100px 16px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px'
  },
  imgTitleDescription: {
    titleWithDescription: {
      wrapper: {
        maxWidth: '488px'
      },
      title: {
        typography: 'h5',
        marginBottom: '7px'
      },
      description: {
        typography: { md: 'body1', xs: 'body2' }
      }
    },
    img: {
      marginBottom: '20px'
    },
    root: {
      textAlign: 'center',
      mb: '34px'
    }
  }
}
