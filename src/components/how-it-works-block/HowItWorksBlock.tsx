import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import HowItWorksCard from '~/components/how-it-works-card/HowItWorksCard'
import AppButton from '../app-button/AppButton'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from './HowItWorksBlock.styles'

interface HowItWorksBlockProps {
  translationKey: string
  cards: Array<{
    image: string
    title: string
    description?: string
  }>
}

const HowItWorksBlock = ({ translationKey, cards }: HowItWorksBlockProps) => {
  const { t } = useTranslation()

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.howItWorks.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t(`${translationKey}.description`)}
        style={styles.titleWithDescription}
        title={t(`${translationKey}.title`)}
      />
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item key={index} md={3} sm={6} xs={12}>
            <HowItWorksCard
              alt={`Step ${index + 1}`}
              description={card.description}
              image={card.image}
              title={card.title}
            />
          </Grid>
        ))}
      </Grid>
      <AppButton
        component={Link}
        sx={styles.button}
        to={authRoutes.findOffers.path}
      >
        {t(`${translationKey}.button`)}
      </AppButton>
    </Box>
  )
}

export default HowItWorksBlock
