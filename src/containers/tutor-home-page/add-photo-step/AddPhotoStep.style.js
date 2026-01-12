import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { md: 'space-between', xs: 'flex-start' },
    gap: { xs: '24px', sm: '32px', md: '40px' },
    height: { sm: 'auto', md: '485px' },
    m: '0 auto',
    maxWidth: { xs: '100%', sm: '428px', md: '100%' },
    ...fadeAnimation
  },
  img: {
    width: '100%',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: { xs: '100%', md: '440px' },
    width: '100%',
    flex: 1,
    pb: { xs: '16px', sm: '26px', md: '52px' },
    order: { xs: 2, md: 1 }
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    width: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' },
    minHeight: { xs: '220px', sm: '320px', md: '440px' }
  },
  activeDrag: {
    border: '2px solid',
    borderColor: 'primary.900'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: { xs: '100%', md: '432px' },
    width: '100%',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', sm: '0' },
    order: { xs: 1, md: 2 }
  },
  description: {
    mb: '20px'
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  },
  fileSizeNote: {
    my: '8px',
    fontSize: { xs: '12px', sm: '14px' },
    color: 'text.secondary'
  },
  errorText: {
    mt: '4px',
    mb: '8px',
    fontSize: { xs: '12px', sm: '14px' }
  },
  previewText: {
    color: 'text.secondary',
    fontWeight: 400,
    fontSize: { xs: '16px', sm: '18px', md: '18px' }
  },
  btnsBox: {
    mt: 'auto',
    order: { xs: 3 }
  }
}
