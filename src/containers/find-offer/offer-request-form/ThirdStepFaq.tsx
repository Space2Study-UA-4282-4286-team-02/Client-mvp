import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { TFunction } from 'i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { IMAGES } from './OfferRequestForm.constants'
import { styles } from './OfferRequestForm.styles'
import { Faq, OfferFormData } from '~/types'
import { CloseRounded } from '@mui/icons-material'

type Props = {
  t: TFunction
  userRole: string
  data: OfferFormData
  errors: Partial<Record<keyof OfferFormData, string>>
  handleBlur: (
    key: keyof OfferFormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (key: keyof OfferFormData, value: unknown) => void
  handleErrors: (key: keyof OfferFormData, error: string) => void
}

const ThirdStepFaq = ({
  t,
  userRole,
  data,
  errors,
  handleBlur,
  handleNonInputValueChange,
  handleErrors
}: Props) => {
  const faqList = data.FAQ || []

  const handleAddFaq = () => {
    const newFaq: Faq = {
      question: '',
      answer: ''
    }
    handleNonInputValueChange('FAQ', [...faqList, newFaq])
  }

  const handleRemoveFaq = (index: number) => {
    const updatedFaq = faqList.filter((_: Faq, i: number) => i !== index)
    handleNonInputValueChange('FAQ', updatedFaq)
  }

  const handleFaqChange = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    const updatedFaq = [...faqList]
    updatedFaq[index] = {
      ...updatedFaq[index],
      [field]: value
    }
    handleNonInputValueChange('FAQ', updatedFaq)
    const currentFaq = updatedFaq[index]
    if (currentFaq.question.trim() !== '' && currentFaq.answer.trim() !== '') {
      handleErrors('FAQ', '')
    }
  }

  return (
    <Box sx={styles.section}>
      <Box sx={styles.sectionHeader}>
        <Box alt='counter 3' component='img' src={IMAGES.counter3} />
        <Typography sx={styles.sectionTitle} variant='h6'>
          {t(`offerPage.title.thirdStep`)}
        </Typography>
      </Box>

      <Box sx={styles.sectionContent}>
        <Typography sx={styles.sectionDescription}>
          {t(`offerPage.description.thirdStep.${userRole}`)}
        </Typography>

        {faqList.map((faq: Faq, index: number) => (
          <Box key={index} sx={styles.faqItemContainer}>
            <Box sx={styles.faqFieldsWrapper}>
              <AppTextField
                errorMsg={errors.FAQ ? t(errors.FAQ) : undefined}
                fullWidth
                onBlur={handleBlur('FAQ')}
                onChange={(e) =>
                  handleFaqChange(index, 'question', e.target.value)
                }
                placeholder={t('offerPage.labels.question')}
                value={faq.question}
              />
              <AppTextArea
                errorMsg={errors.FAQ ? t(errors.FAQ) : undefined}
                fullWidth
                maxLength={400}
                onBlur={handleBlur('FAQ')}
                onChange={(e) =>
                  handleFaqChange(index, 'answer', e.target.value)
                }
                placeholder={t('offerPage.labels.answer')}
                value={faq.answer}
              />
            </Box>
            <IconButton onClick={() => handleRemoveFaq(index)} size='small'>
              <CloseRounded fontSize='small' />
            </IconButton>
          </Box>
        ))}

        {errors.FAQ && faqList.length === 0 && (
          <Typography sx={styles.errorText}>{t(errors.FAQ)}</Typography>
        )}

        <Button onClick={handleAddFaq} sx={{ width: '50%' }} variant='tonal'>
          {t('offerPage.createOffer.buttonTitles.addQuestion')}
        </Button>
      </Box>
    </Box>
  )
}

export default ThirdStepFaq
