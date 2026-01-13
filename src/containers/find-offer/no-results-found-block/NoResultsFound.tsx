import { Box } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import { styles } from '~/containers/find-offer/no-results-found-block/NoResultsFound.styles'
import { ButtonVariantEnum } from '~/types'

interface NoResultsFoundProps {
  image: string
  title: string
  description: string
  actionLabel: string
  action: () => void
}

function NoResultsFound({
  action,
  actionLabel,
  image,
  title,
  description
}: NoResultsFoundProps) {
  return (
    <Box sx={styles.section}>
      <ImgTitleDescription
        description={description}
        img={image}
        style={styles.imgTitleDescription}
        title={title}
      />
      <AppButton onClick={action} variant={ButtonVariantEnum.Tonal}>
        {actionLabel}
      </AppButton>
    </Box>
  )
}

export default NoResultsFound
