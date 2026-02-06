import { CardVariant } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

export const styles = {
  container: (cardVariant: CardVariant) => ({
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    gridTemplateColumns:
      cardVariant === 'grid'
        ? 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))'
        : 'minmax(0, 1fr)',
    [theme.breakpoints.down(450)]: {
      gridTemplateColumns: '1fr'
    },
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box' as const,
    backgroundColor: 'basic.grey',
    overflow: 'hidden'
  })
}
