import { Box } from '@mui/material'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

import { styles } from '../howItWorksStepBlock/HowItWorksStepBlock.styles'

interface HowItWorksStepBlockProps {
  image?: string
  alt?: string
  title: string
  description?: string
  cardWidth: number
}

function HowItWorksStepBlock({
  image,
  alt,
  title,
  description,
  cardWidth
}: HowItWorksStepBlockProps) {
  return (
    <Box sx={{ ...styles.wrapper, maxWidth: cardWidth }}>
      <Box alt={alt} component='img' src={image} sx={styles.img} />
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default HowItWorksStepBlock
