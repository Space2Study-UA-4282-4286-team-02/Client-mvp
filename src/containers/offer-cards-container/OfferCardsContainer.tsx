import React from 'react'
import { styles } from '~/containers/offer-cards-container/OfferCardsContainer.styles'
import { OfferCardContainerProps } from '~/types'
import OfferCard from '~/components/offer-card/OfferCard'

const OfferCardsContainer: React.FC<OfferCardContainerProps> = ({
  offers,
  cardVariant
}) => {
  return (
    <div style={styles.container(cardVariant)}>
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} variant={cardVariant} />
      ))}
    </div>
  )
}

export default OfferCardsContainer
