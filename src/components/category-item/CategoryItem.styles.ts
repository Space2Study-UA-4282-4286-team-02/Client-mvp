export const styles = {
  flexbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  img: {
    width: '100%',
    alignSelf: 'center',
    mr: '24px',
    maxWidth: '62px',
    maxHeight: '62px'
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      alignSelf: 'center',
      margin: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'primary.900',
      typography: 'h6',
      m: 0
    },
    description: {
      typography: 'body2',
      color: 'primary.500'
    }
  }
}
