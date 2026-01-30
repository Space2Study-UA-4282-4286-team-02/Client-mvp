import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import Faq from '~/containers/student-home-page/faq/Faq'

import { styles } from './StudentHome.styles'
import { translationKey } from '~/components/find-block/find-tutor-constants'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: styles.modal
        },
        requireConfirmOnClose: true
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <PageWrapper
      data-testid='studentHome'
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '80px'
      }}
    >
      <FindBlock translationKey={translationKey} />
      <Faq />
    </PageWrapper>
  )
}

export default StudentHome
