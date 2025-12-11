import Box from '@mui/material/Box'

import AppHeader from '~/containers/layout/app-header/AppHeader'
import AppMain from '~/containers/layout/app-main/AppMain'
import { styles } from '~/containers/app-content/AppContent.styles'
import { useRef } from 'react'

const AppContent = () => {
  const pageRef = useRef<HTMLDivElement>(null)
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader pageRef={pageRef} />
      <AppMain mainWithFooterRef={pageRef} />
    </Box>
  )
}

export default AppContent
