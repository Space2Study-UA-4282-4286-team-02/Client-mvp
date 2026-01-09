export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '572px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mt: '5px'
  },
  title: {
    fontWeight: 500,
    color: 'primary.700',
    fontSize: '24px'
  },
  description: {
    fontWeight: 400,
    color: 'primary.700',
    fontSize: '16px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionTitle: {
    fontWeight: 500,
    color: 'primary.700'
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pl: '44px'
  },
  sectionDescription: {
    color: 'primary.500',
    fontSize: '16px'
  },
  priceSeparator: {
    color: 'primary.500'
  },
  tutorsCount: {
    fontSize: '14px',
    color: 'primary.500',
    mt: '8px'
  },
  checkboxLabel: {
    '& .MuiTypography-root': {
      fontWeight: 400,
      color: 'primary.900',
      fontSize: '14px'
    }
  },
  chipContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    mt: '8px'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    mt: '8px'
  },
  errorText: {
    color: 'error.main',
    fontSize: '12px',
    mt: '4px'
  }
}
