import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import NoResultsFound from '~/containers/find-offer/no-results-found-block/NoResultsFound'

import searchIcon from '~/assets/img/find-offer/search_icon.svg'

const FindOffers = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <NoResultsFound
        action={() => {}}
        actionLabel={t('findOffers.notFound.button')}
        description={t('findOffers.notFound.description')}
        image={searchIcon}
        title={t('findOffers.notFound.title')}
      />
    </PageWrapper>
  )
}

export default FindOffers
