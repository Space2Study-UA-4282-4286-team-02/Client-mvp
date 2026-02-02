import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TitleWithDescription from '../title-with-description/TitleWithDescription'

import { styles } from './HowItWorksCard.styles'

interface HowItWorksCardProps {
  image: string
  alt?: string
  title: string
  description?: string
  cardWidth?: number
}

function HowItWorksCard({
  image,
  alt,
  title,
  description,
  cardWidth
}: HowItWorksCardProps) {
  const { t } = useTranslation()

  return (
    <Box sx={{ ...styles.wrapper, ...(cardWidth && { maxWidth: cardWidth }) }}>
      <Box
        alt={alt ? String(t(alt)) : undefined}
        component='img'
        src={image}
        sx={styles.img}
      />
      <TitleWithDescription
        description={description ? t(description) : undefined}
        style={styles.titleWithDescription}
        title={t(title)}
      />
    </Box>
  )
}

export default HowItWorksCard
