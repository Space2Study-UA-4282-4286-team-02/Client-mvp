import { FC } from 'react'
import { styles } from '~/components/view-switcher/ViewSwitcher.styles'
import { Button, Stack } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'

export type ViewMode = 'list' | 'grid'

interface ViewSwitcherProps {
  mode: ViewMode
  changeMode: (mode: ViewMode) => void
}

const ViewSwitcher: FC<ViewSwitcherProps> = ({ mode, changeMode }) => {
  return (
    <Stack direction='row' spacing={1}>
      <Button
        onClick={() => changeMode('grid')}
        size='small'
        sx={mode === 'grid' ? styles.btnSelected : styles.btn}
        variant='outlined'
      >
        <GridViewIcon />
      </Button>
      <Button
        onClick={() => changeMode('list')}
        size='small'
        sx={mode === 'list' ? styles.btnSelected : styles.btn}
        variant='outlined'
      >
        <ListIcon />
      </Button>
    </Stack>
  )
}

export default ViewSwitcher
