import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import HowItWorksBlock from '~/components/how-it-works-block/HowItWorksBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import { howItWorksCards } from '~/containers/tutor-home-page/tutor-how-it-works/HowItWorksCards'
import { translationKey as popularCategoriesKey } from '~/components/popular-categories/popular-tutor-constants'

const TutorHome = () => {
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
    <PageWrapper data-testid='tutorHome' sx={styles.pageWrapper}>
      <FindBlock translationKey={translationKey} />
      <HowItWorksBlock
        cards={howItWorksCards}
        translationKey='tutorHomePage.howItWorks'
      />
      <PopularCategories translationKey={popularCategoriesKey} />
    </PageWrapper>
  )
}

export default TutorHome
