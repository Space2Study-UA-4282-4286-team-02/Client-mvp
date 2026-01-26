import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'
import useConfirm from '~/hooks/use-confirm'
import { useTranslation } from 'react-i18next'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
  requireConfirmOnClose?: boolean
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [requireConfirmOnClose, setRequireConfirmOnClose] = useState(false)

  const { t } = useTranslation()
  const { openDialog } = useConfirm()

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
    setRequireConfirmOnClose(false)
  }, [setModal, setPaperProps, setTimer, setRequireConfirmOnClose])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const handleCloseWithConfirm = useCallback(() => {
    if (requireConfirmOnClose) {
      openDialog({
        sendConfirm: (value: boolean) => {
          if (value) {
            closeModal()
          }
        },
        message: t('common.confirmCloseMessage'),
        title: t('common.confirmCloseTitle')
      })
    } else {
      closeModal()
    }
  }, [requireConfirmOnClose, openDialog, closeModal, t])

  const openModal = useCallback(
    (
      { component, paperProps, requireConfirmOnClose }: Component,
      delayToClose?: number
    ) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
      setRequireConfirmOnClose(requireConfirmOnClose ?? false)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          onCloseAttempt={handleCloseWithConfirm}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
