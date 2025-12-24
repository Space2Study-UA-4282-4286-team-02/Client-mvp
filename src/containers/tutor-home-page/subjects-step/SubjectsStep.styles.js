import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  titleDescription: {
    wrapper: { mb: '6px' },
    title: { display: 'none' },
    description: { color: 'primary.700' }
  },
  inputTitle: {
    typography: 'body2',
    color: 'primary.500',
    textAlign: 'left'
  },
  addSubjectButton: {
    mt: '4px',
    width: '100%'
  },
  chipsWrapper: {
    mt: '6px'
  },
  errorText: {
    color: 'error.500',
    typography: 'caption',
    minHeight: '18px'
  }
}
