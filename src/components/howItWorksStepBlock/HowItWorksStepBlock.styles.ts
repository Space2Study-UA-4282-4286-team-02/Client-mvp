export const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '16px'
  },
  img: {
    width: '100%',
    maxWidth: '64px',
    maxHeight: '64px',
    marginBottom: '24px'
  },
  titleWithDescription: {
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      marginBottom: '16px'
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}
