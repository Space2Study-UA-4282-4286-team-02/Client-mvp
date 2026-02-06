export const styles = {
  wrapper: {
    mt: 6,
    mb: 8
  },

  container: {
    maxWidth: 1160,
    mx: 'auto',
    px: { xs: 2, md: 0 }
  },

  title: {
    fontWeight: 700,
    mb: 3
  },

  card: {
    height: 96,
    borderRadius: 2,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
    transition: 'all .2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 26px rgba(0,0,0,0.06)'
    }
  },

  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 3,
    py: 2
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },

  iconImage: {
    width: 40,
    height: 40
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.2
  },

  categorySubtitle: {
    fontSize: 13,
    color: 'text.secondary',
    mt: 0.5
  },

  buttonWrapper: {
    textAlign: 'center',
    mt: 4
  },

  loaderBox: {
    textAlign: 'center',
    py: 6
  }
}
