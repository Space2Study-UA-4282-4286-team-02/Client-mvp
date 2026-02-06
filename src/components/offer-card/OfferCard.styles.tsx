import { SxProps, Theme } from '@mui/material'

type StyleFunction = (isSquare: boolean) => SxProps<Theme>

interface OfferCardStyles {
  [key: string]: SxProps<Theme> | StyleFunction
}

export const styles: OfferCardStyles = {
  card: (isSquare: boolean): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: isSquare ? 'column' : 'row',
    gap: isSquare ? '24px' : '50px',
    width: isSquare ? '360px' : '100%',
    maxWidth: '100%',
    padding: isSquare ? '24px 20px' : '31px 20px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    position: 'relative',
    borderColor: 'primary.100',
    minHeight: isSquare ? 'unset' : '200px',
    boxSizing: 'border-box'
  }),

  bookmarkIcon: {
    position: 'absolute',
    top: '16px',
    right: '8px'
  },

  authorInfo: (isSquare: boolean): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: isSquare ? 'row' : 'column',
    alignItems: 'center',
    gap: isSquare ? '25px' : '12px',
    maxWidth: '150px'
  }),

  avatar: {
    marginTop: '4px',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '1px solid',
    cursor: 'pointer',
    objectFit: 'cover'
  },

  authorName: (isSquare: boolean): SxProps<Theme> => ({
    marginTop: isSquare ? '8px' : 0,
    fontWeight: 600,
    cursor: 'pointer',
    color: 'primary.500',
    fontSize: '14px',
    lineHeight: isSquare ? '1.6em' : '1.2',
    marginBottom: isSquare ? '8px' : '4px',
    overflow: 'hidden',
    display: isSquare ? '-webkit-box' : 'block',
    WebkitLineClamp: isSquare ? 2 : undefined,
    WebkitBoxOrient: isSquare ? 'vertical' : undefined,
    whiteSpace: isSquare ? 'normal' : 'nowrap',
    maxWidth: isSquare ? '160px' : '110px',
    paddingRight: '5px'
  }),

  languagesInSquare: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
    gap: '5px',
    color: 'primary.400'
  },

  languageIcon: {
    fontSize: '16px',
    color: 'primary.400'
  },

  ratingInList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'primary.50',
    borderRadius: '5px',
    padding: '1px 4px',
    width: '100%',
    boxSizing: 'border-box'
  },

  starsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    flex: 1,
    overflow: 'hidden'
  },

  starIcon: {
    color: 'warning.main',
    fontSize: '14px'
  },

  ratingNumber: {
    fontSize: '10px',
    fontWeight: 600,
    marginLeft: '4px',
    marginTop: '4px',
    display: 'block',
    lineHeight: 1
  },

  reviews: {
    color: 'primary.500',
    fontSize: '10px',
    marginTop: '5px'
  },

  divider: (isSquare: boolean): SxProps<Theme> => ({
    visibility: isSquare ? 'visible' : 'hidden',
    borderBottomWidth: '1px',
    borderColor: 'primary.100',
    my: isSquare ? '8px' : '4px'
  }),

  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  title: (isSquare: boolean): SxProps<Theme> => ({
    fontSize: '16px',
    color: 'primary.700',
    fontWeight: 600,
    lineHeight: '1.4',
    maxHeight: isSquare ? '2.8em' : '4.0em',
    display: '-webkit-box',
    WebkitLineClamp: isSquare ? 2 : 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }),

  subjectBlock: (isSquare: boolean): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: isSquare ? 'column' : 'row',
    gap: '4px',
    my: '4px'
  }),

  tagRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  label: {
    typography: 'caption',
    color: 'primary.500',
    width: '58px',
    height: '15px',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 400,
    letterSpacing: '1.5px'
  },

  subjectBadge: {
    backgroundColor: 'rgb(184,208,161)',
    color: 'primary.900',
    padding: '4px 14px',
    borderRadius: '10px',
    fontSize: '9px',
    fontWeight: 500,
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },

  levelBadge: {
    backgroundColor: 'rgb(231,240,223)',
    color: 'primary.700',
    padding: '4px 14px',
    borderRadius: '9px',
    fontSize: '9px',
    fontWeight: 400,
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  },

  languagesInListBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  languagesInList: {
    fontSize: '12px',
    color: 'primary.400'
  },

  description: (): SxProps<Theme> => {
    const lineCount = 5
    const lineHeight = 1.5

    return {
      fontSize: '12px',
      color: 'primary.600',
      lineHeight: lineHeight,
      display: '-webkit-box',
      WebkitLineClamp: lineCount,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      height: `${lineHeight * lineCount}em`,
      my: '4px'
    }
  },

  price: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    mt: '16px'
  },

  sendMessageBtn: {
    backgroundColor: 'primary.50',
    color: '#333e48',
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out',
    textTransform: 'none',
    borderRadius: '5px',
    '&:hover': {
      color: 'white',
      backgroundColor: 'primary.500',
      boxShadow: '0 4px 8px rgb(0,0,0,0.1)'
    }
  }
}
