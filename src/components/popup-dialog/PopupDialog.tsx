import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  closeModal: () => void
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  closeModal,
  content,
  paperProps,
  timerId,
  closeModalAfterDelay
}) => {
  const { isMobile } = useBreakpoints()
  const handleClose: DialogProps['onClose'] = (_event, reason) => {
    if (reason === 'backdropClick') {
      return
    }
  }

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClose={handleClose}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton
          aria-label='close popup'
          onClick={closeModal}
          sx={styles.icon}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
