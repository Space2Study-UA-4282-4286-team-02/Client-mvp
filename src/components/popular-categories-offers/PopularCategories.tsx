import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { styles } from '~/components/popular-categories-offers/PopularCategories.styles'

import globeIcon from '~/assets/img/popular-categories/globe-icon.svg'
import hashIcon from '~/assets/img/popular-categories/hash-icon.svg'
import computerIcon from '~/assets/img/popular-categories/computer-icon.svg'
import musicIcon from '~/assets/img/popular-categories/music-icon.svg'
import designIcon from '~/assets/img/popular-categories/design-icon.svg'
import financesIcon from '~/assets/img/popular-categories/finances-icon.svg'
import biologyIcon from '~/assets/img/popular-categories/biology-icon.svg'
import paintingIcon from '~/assets/img/popular-categories/painting-icon.svg'
import starIcon from '~/assets/img/popular-categories/star-icon.svg'

const POPULAR_CATEGORIES_CONFIG = [
  { name: 'Languages', icon: 'globe', color: '#E6F4EA' },
  { name: 'Mathematics', icon: 'hash', color: '#FFF4CC' },
  { name: 'Computer science', icon: 'computer', color: '#EAF3F6' },
  { name: 'Music', icon: 'music', color: '#FCE8ED' },
  { name: 'Design', icon: 'design', color: '#E8F6F5' },
  { name: 'History', icon: 'star', color: '#FCEFE6' },
  { name: 'Biology', icon: 'biology', color: '#EDF6F7' },
  { name: 'Painting', icon: 'painting', color: '#EEF7EE' },
  { name: 'Finances', icon: 'finances', color: '#FFF6DF' }
]

interface PopularCategoryData {
  name: string
  icon: string
  color: string
  totalOffers: number
}

const getCategoryIcon = (iconName: string): string => {
  const map: Record<string, string> = {
    globe: globeIcon,
    hash: hashIcon,
    computer: computerIcon,
    music: musicIcon,
    design: designIcon,
    finances: financesIcon,
    biology: biologyIcon,
    painting: paintingIcon,
    star: starIcon
  }
  return map[iconName] || hashIcon
}

const PopularCategoriesOffers: React.FC = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<PopularCategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await categoryService.getCategories({ limit: 100 })
        const all = res.data.items || [] 

        const data = POPULAR_CATEGORIES_CONFIG.map(cfg => {
          const found = all.find((c: any) => c.name === cfg.name)

          const totalOffersCount = found
            ? found.totalOffers.student + found.totalOffers.tutor
            : 0

          return {
            ...cfg,
            totalOffers: totalOffersCount
          }
        })

        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleCategoryClick = () => {
    navigate(authRoutes.categories.path)
  }

  if (loading) {
    return (
      <Box sx={styles.loaderBox}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.title}>
          Popular Categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map(category => (
            <Grid item xs={12} md={4} key={category.name}>
              <Card onClick={handleCategoryClick} sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                  <Box sx={{ ...styles.iconBox, backgroundColor: category.color }}>
                    <Box
                      component="img"
                      src={getCategoryIcon(category.icon)}
                      alt={category.name}
                      sx={styles.iconImage}
                    />
                  </Box>

                  <Box sx={styles.textContainer}>
                    <Typography sx={styles.categoryTitle}>
                      {category.name}
                    </Typography>
                    <Typography sx={styles.categorySubtitle}>
                      {category.totalOffers} Offers
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={styles.buttonWrapper}>
          <Button
            variant="outlined"
            onClick={handleCategoryClick}
            sx={{ textTransform: 'none', px: 4 }}
          >
            View all categories
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PopularCategoriesOffers
