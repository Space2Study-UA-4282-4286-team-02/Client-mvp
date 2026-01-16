export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '572px'
  },
  header: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      mt: '5px'
    },
    title: {
      color: 'primary.700'
    }
  },
  titleDescription: {
    wrapper: {
      color: 'primary.700'
    }
  },
  section: {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    title: {
      color: 'primary.700'
    },
    description: {
      color: 'primary.500'
    },
    content: {
      default: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pl: '34px'
      },
      compact: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        pl: '34px'
      }
    }
  },
  field: {
    row: {
      default: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      },
      compact: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        mb: '12px'
      }
    },
    price: {
      wrapper: {
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        width: '200px'
      }
    }
  },
  chips: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      mt: '-12px'
    }
  },
  checkbox: {
    label: {
      '& .MuiTypography-root': {
        color: 'primary.900',
        fontSize: '14px'
      }
    }
  },
  faq: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
      alignItems: 'flex-start'
    },
    fieldsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    mt: '8px'
  }
}
