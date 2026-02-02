import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'

import { styles } from './StudentHome.styles'
import { translationKey } from '~/components/find-block/find-tutor-constants'
import { translationKey as popularCategoriesKey } from '~/components/popular-categories/popular-student-constants'

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
    <PageWrapper data-testid='studentHome' sx={styles.pageWrapper}>
      <FindBlock translationKey={translationKey} />
      <PopularCategories translationKey={popularCategoriesKey} />
      <Faq />
    </PageWrapper>
  )
}

export default StudentHome
