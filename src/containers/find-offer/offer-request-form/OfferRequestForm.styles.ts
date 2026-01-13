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
    gap: '12px'
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
    gap: '12px',
    pl: '34px'
  },
  sectionContentSecond: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    pl: '34px'
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
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
    mt: '-12px',
    mb: '12px'
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
