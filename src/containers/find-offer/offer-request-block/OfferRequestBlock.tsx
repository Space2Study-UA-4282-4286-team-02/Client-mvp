import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import OfferRequestForm from '~/containers/find-offer/offer-request-form/OfferRequestForm'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'
import { useAppSelector } from '~/hooks/use-redux'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()

  const { userRole } = useAppSelector((state) => state.appMain)

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <>
      <TitleBlock img={icon} translationKey={translationKey}>
        <AppButton
          fullWidth={isMobile}
          onClick={handleOpenDrawer}
          sx={{ py: '14px' }}
        >
          {t(`${translationKey}.button.${userRole}`)}
        </AppButton>
      </TitleBlock>
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <OfferRequestForm closeDrawer={closeDrawer} />
      </AppDrawer>
    </>
  )
}

export default OfferRequestBlock
