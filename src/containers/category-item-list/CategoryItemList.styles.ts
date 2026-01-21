export const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'center',
    gap: '24px'
  },
  gridTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
    gap: '24px'
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    gap: '24px'
  },
  buttonViewMore: {
    backgroundColor: 'basic.grey',
    color: 'basic.blueGray900',
    width: 'max-content',
    margin: '30px auto',
    '&:hover': {
      backgroundColor: 'basic.turquoiseChat'
    }
  }
}
