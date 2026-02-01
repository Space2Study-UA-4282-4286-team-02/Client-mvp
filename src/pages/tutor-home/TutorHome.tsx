import { useEffect } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import HowItWorksBlock from '~/components/how-it-works-block/HowItWorksBlock'

import { styles } from '~/pages/tutor-home/TutorHome.styles'
import { translationKey } from '~/components/find-block/find-student-constants'
import { translationKey as popularCategoriesKey } from '~/components/popular-categories/popular-tutor-constants'
import { howItWorksCards } from '~/containers/tutor-home-page/tutor-how-it-works/HowItWorksCards'

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
    <PageWrapper data-testid='tutorHome'>
      <FindBlock translationKey={translationKey} />
      <PopularCategories translationKey={popularCategoriesKey} />
      <HowItWorksBlock
        cards={howItWorksCards}
        translationKey='tutorHomePage.howItWorks'
      />
    </PageWrapper>
  )
}

export default TutorHome
