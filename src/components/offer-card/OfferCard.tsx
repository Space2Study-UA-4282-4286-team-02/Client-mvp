import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, generatePath } from 'react-router-dom'
import { useModalContext } from '~/context/modal-context'

import { OfferCardProps } from '~/types'
import { styles } from './OfferCard.styles'
import { viewDetailsBtnStyles } from '~/components/offer-card/ViewDetailsBtn.styles'
import {
  Box,
  Typography,
  IconButton,
  Divider,
  SxProps,
  Theme
} from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import AppButton from '~/components/app-button/AppButton'
import LanguageIcon from '@mui/icons-material/Language'
import StarIcon from '@mui/icons-material/Star'
import { authRoutes } from '~/router/constants/authRoutes'
import EnrollOfferModal from '~/containers/offer-details/enroll-offer-modal/EnrollOfferModal'

type StyleFunction = (isSquare: boolean) => SxProps<Theme>

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  variant = 'grid',
  sx
}) => {
  const {
    author,
    authorRole,
    title,
    price,
    subject,
    languages,
    proficiencyLevel,
    description
  } = offer
  const { openModal, closeModal } = useModalContext()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isSquare = variant === 'grid'
  const authorFullName = `${author.firstName} ${author.lastName}`

  const cardStyles = (styles.card as StyleFunction)(isSquare)
  const authorInfoStyles = (styles.authorInfo as StyleFunction)(isSquare)
  const authorNameStyles = (styles.authorName as StyleFunction)(isSquare)
  const dividerStyles = (styles.divider as StyleFunction)(isSquare)
  const titleStyles = (styles.title as StyleFunction)(isSquare)
  const subjectBlockStyles = (styles.subjectBlock as StyleFunction)(isSquare)
  const descriptionStyles = (styles.description as StyleFunction)(isSquare)

  const formatName = (name: string, square: boolean) => {
    const charLimit = square ? 30 : 11
    if (name.length > charLimit) {
      return name.substring(0, charLimit).trim() + '.'
    }
    return name
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked((prev) => !prev)
  }

  const handleNavigateToProfile = () => {
    const path = generatePath(`/${authRoutes.userProfile.route}`, {
      id: offer.author._id
    })
    navigate(`${path}?role=${offer.authorRole}`)
  }

  const handleSendMessage = () => {
    openModal({
      component: (
        <EnrollOfferModal
          closeModal={closeModal}
          offer={offer}
          withMentorCard
        />
      )
    })
  }

  return (
    <Box sx={[cardStyles, sx as SxProps<Theme>] as SxProps<Theme>}>
      {' '}
      <IconButton
        onClick={handleBookmarkClick}
        sx={styles.bookmarkIcon as SxProps<Theme>}
      >
        {isBookmarked ? (
          <BookmarkIcon sx={{ color: 'primary.main' }} />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>
      <Box sx={authorInfoStyles}>
        <Box
          component='img'
          onClick={handleNavigateToProfile}
          src={author.photo || 'placeholder-url'}
          sx={styles.avatar as SxProps<Theme>}
        />

        <Box>
          <Box>
            <Typography
              onClick={handleNavigateToProfile}
              sx={authorNameStyles}
              title={authorFullName}
            >
              {formatName(authorFullName, isSquare)}
            </Typography>

            {isSquare && (
              <Box sx={styles.languagesInSquare as SxProps<Theme>}>
                <LanguageIcon sx={{ fontSize: '16px' }} />
                <Typography sx={{ fontSize: '12px' }} variant='caption'>
                  {t(`common.languages.${languages[0].toLowerCase()}`)}
                </Typography>
              </Box>
            )}
            {!isSquare && (
              <Box>
                <Box sx={styles.ratingInList as SxProps<Theme>}>
                  <Box sx={styles.starsBox as SxProps<Theme>}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        sx={styles.starIcon as SxProps<Theme>}
                      />
                    ))}
                  </Box>
                  <Typography
                    gutterBottom
                    sx={styles.ratingNumber as SxProps<Theme>}
                    variant='body2'
                  >
                    {author.averageRating[authorRole].toFixed(1)}
                  </Typography>
                </Box>
                <Typography
                  sx={styles.reviews as SxProps<Theme>}
                  variant={'caption'}
                >
                  {author.totalReviews[authorRole]} reviews
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={styles.mainContent as SxProps<Theme>}>
        <Typography sx={titleStyles}>{title}</Typography>
        <Divider sx={dividerStyles} />

        <Box sx={subjectBlockStyles}>
          <Box sx={styles.tagRow as SxProps<Theme>}>
            {isSquare && (
              <Typography sx={styles.label as SxProps<Theme>}>
                {t('common.labels.subject')}
              </Typography>
            )}
            <Typography
              sx={styles.subjectBadge as SxProps<Theme>}
              variant={'subtitle2'}
            >
              {subject.name}
            </Typography>
          </Box>

          <Box sx={styles.tagRow as SxProps<Theme>}>
            {isSquare && (
              <Typography sx={styles.label as SxProps<Theme>}>
                {t('common.labels.level')}
              </Typography>
            )}
            <Typography
              sx={styles.levelBadge as SxProps<Theme>}
              variant={'subtitle2'}
            >
              {(Array.isArray(proficiencyLevel)
                ? proficiencyLevel
                : [proficiencyLevel]
              )
                .filter(Boolean)
                .map((level) => t(`common.levels.${level.toLowerCase()}`))
                .join(' - ')}
            </Typography>
          </Box>
        </Box>

        {!isSquare && (
          <>
            <Typography sx={descriptionStyles}>{description}</Typography>
            <Box sx={styles.languagesInListBlock as SxProps<Theme>}>
              <LanguageIcon sx={styles.languageIcon as SxProps<Theme>} />
              <Typography sx={styles.languagesInList as SxProps<Theme>}>
                {languages
                  .map((language) =>
                    t(`common.languages.${language.toLowerCase()}`)
                  )
                  .join(', ')}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={styles.price as SxProps<Theme>}>
            <Typography sx={{ fontWeight: 400 }} variant='h6'>
              {`${price} ${t('common.uah')}`}
            </Typography>
            <Typography
              color='text.secondary'
              sx={{ fontSize: '10px', padding: 0 }}
              variant='caption'
            >
              {`/  ${t('common.hour')}`}
            </Typography>
          </Box>

          {isSquare && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <StarIcon sx={{ color: 'warning.main', fontSize: '20px' }} />
                <Typography sx={{ fontWeight: 400, ml: '5px' }} variant='h6'>
                  {author.averageRating[authorRole].toFixed(1)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  ml: '4px',
                  color: 'text.secondary',
                  fontSize: '10px',
                  letterSpacing: 1
                }}
                variant='caption'
              >
                {author.totalReviews[authorRole]} REVIEWS
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={styles.actions as SxProps<Theme>}>
          <AppButton
            color='secondary'
            fullWidth
            sx={viewDetailsBtnStyles(t)}
            variant='contained'
          >
            Show details
          </AppButton>
          <AppButton
            fullWidth
            onClick={handleSendMessage}
            sx={styles.sendMessageBtn as SxProps<Theme>}
            variant='outlined'
          >
            {t('common.labels.sendMessage')}
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default OfferCard
