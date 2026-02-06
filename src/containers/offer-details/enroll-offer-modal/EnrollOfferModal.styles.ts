import { SxProps, Theme } from '@mui/material'

interface EnrollOfferStyles {
  [key: string]: SxProps<Theme>
}

export const styles: EnrollOfferStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: { xs: '30px 20px', sm: '40px 60px', md: '50px 90px' },
    position: 'relative',
    maxWidth: '580px',
    width: '100%',
    borderRadius: '8px',
    gap: '19px',
    boxSizing: 'border-box'
  },
  offerPart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px'
  },
  titleBox: {
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    mb: 1,
    fontWeight: 500,
    fontSize: { xs: '24px', sm: '30px', md: '35px' },
    color: 'primary.600',
    letterSpacing: '0.25%'
  },
  subtitle: {
    marginTop: { xs: '0px', md: '-15px' },
    color: 'primary.500',
    fontSize: { xs: '16px', md: '18px' },
    fontWeight: 500,
    letterSpacing: '0.15px',
    lineHeight: '24px'
  },
  mentorCard: {
    width: '100%',
    maxWidth: '360px',
    minHeight: { xs: 'auto', md: '503px' },
    boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
    pointerEvents: 'none',
    userSelect: 'none'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    gap: '16px'
  },
  selectBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  chooseDesc: {
    fontSize: '16px',
    fontWeight: 400,
    letterSpacing: '0.5px',
    color: 'primary.500'
  },
  submitBtn: {
    width: { xs: '100%', sm: '260px' },
    height: '48px',
    padding: '7px 24px',
    borderRadius: '4px',
    backgroundColor: 'primary.900',
    mt: '10px',
    '&:hover': { backgroundColor: 'primary.500' }
  }
}
