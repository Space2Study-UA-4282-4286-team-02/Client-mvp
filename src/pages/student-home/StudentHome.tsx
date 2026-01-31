import { useEffect } from 'react'
import Container from '@mui/material/Container'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'

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
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        },
        requireConfirmOnClose: true
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindBlock translationKey={translationKey} />
      <PopularCategories translationKey={popularCategoriesKey} />
      <Faq />
    </Container>
  )
}

export default StudentHome
