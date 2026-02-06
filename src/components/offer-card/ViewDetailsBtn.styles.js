export const viewDetailsBtnStyles = (t) => ({
  backgroundColor: 'primary.900',
  color: 'white',
  position: 'relative',
  textTransform: 'none',
  border: '1px solid transparent',
  transition: 'all 0.2s ease-in-out',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: 'primary.50',
    boxShadow: '0 4px 8px rgb(0,0,0,0.1)',
    color: 'transparent',
    transition: 'color 0s',
    '&::after': {
      content: `"${t('common.labels.viewDetails')}"`,
      backgroundColor: 'primary.50',
      color: 'primary.900',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      visibility: 'visible',
      width: '100%'
    }
  }
})
