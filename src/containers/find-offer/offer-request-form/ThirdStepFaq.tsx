import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { TFunction } from 'i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import {
  IMAGES,
  FAQ_LIMITS,
  FIELD_LIMITS,
  OfferFormData
} from './OfferRequestForm.constants'
import { styles } from './OfferRequestForm.styles'
import {
  ButtonVariantEnum,
  Faq,
  SizeEnum,
  TypographyVariantEnum
} from '~/types'
import { CloseRounded } from '@mui/icons-material'

type Props = {
  t: TFunction
  userRole: string
  data: OfferFormData
  errors: Partial<Record<keyof OfferFormData, string>>
  handleNonInputValueChange: (key: keyof OfferFormData, value: unknown) => void
  handleErrors: (key: keyof OfferFormData, error: string) => void
}

const ThirdStepFaq = ({
  t,
  userRole,
  data,
  handleNonInputValueChange,
  handleErrors
}: Props) => {
  const faqList = data.FAQ || []
  const [faqErrors, setFaqErrors] = useState<
    Record<number, { question?: string; answer?: string }>
  >({})

  const validateField = (value: string): string => {
    return value.trim() === '' ? 'common.errorMessages.emptyField' : ''
  }

  const handleAddFaq = () => {
    if (faqList.length >= FAQ_LIMITS.MAX) return
    const newFaq: Faq = {
      question: '',
      answer: ''
    }
    const updatedFaq = [...faqList, newFaq]
    handleNonInputValueChange('FAQ', updatedFaq)
    handleErrors('FAQ', 'offerPage.errorMessages.faq')
  }

  const handleRemoveFaq = (index: number) => {
    if (faqList.length <= FAQ_LIMITS.MIN) return
    const updatedFaq = faqList.filter((_: Faq, i: number) => i !== index)
    handleNonInputValueChange('FAQ', updatedFaq)

    const allValid = updatedFaq.every(
      (faq) => faq.question.trim() !== '' && faq.answer.trim() !== ''
    )

    if (allValid) {
      handleErrors('FAQ', '')
    } else {
      handleErrors('FAQ', 'offerPage.errorMessages.faq')
    }

    setFaqErrors((prev) => {
      const newErrors: Record<number, { question?: string; answer?: string }> =
        {}
      Object.entries(prev).forEach(([oldIndex, error]) => {
        const oldIdx = parseInt(oldIndex, 10)
        if (oldIdx < index) {
          newErrors[oldIdx] = error
        } else if (oldIdx > index) {
          newErrors[oldIdx - 1] = error
        }
      })
      return newErrors
    })
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

    const allValid = updatedFaq.every(
      (faq) => faq.question.trim() !== '' && faq.answer.trim() !== ''
    )

    if (allValid) {
      handleErrors('FAQ', '')
    } else {
      handleErrors('FAQ', 'offerPage.errorMessages.faq')
    }
  }

  const handleFaqFieldBlur = (index: number, field: 'question' | 'answer') => {
    const faq = faqList[index]
    const fieldValue = faq[field]
    const error = validateField(fieldValue)

    setFaqErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: error
      }
    }))
  }

  return (
    <Box sx={styles.section.wrapper}>
      <Box sx={styles.section.header}>
        <Box alt='counter 3' component='img' src={IMAGES.counter3} />
        <Typography
          sx={styles.section.title}
          variant={TypographyVariantEnum.H6}
        >
          {t(`offerPage.title.thirdStep`)}
        </Typography>
      </Box>

      <Box sx={styles.section.content.default}>
        <Typography sx={styles.section.description}>
          {t(`offerPage.description.thirdStep.${userRole}`)}
        </Typography>

        {faqList.map((faq: Faq, index: number) => (
          <Box key={index} sx={styles.faq.container}>
            <Box sx={styles.faq.fieldsWrapper}>
              <AppTextField
                errorMsg={
                  faqErrors[index]?.question
                    ? t(faqErrors[index].question)
                    : undefined
                }
                fullWidth
                inputProps={{
                  maxLength: FIELD_LIMITS.QUESTION_MAX_LENGTH
                }}
                onBlur={() => handleFaqFieldBlur(index, 'question')}
                onChange={(e) =>
                  handleFaqChange(index, 'question', e.target.value)
                }
                placeholder={t('offerPage.labels.question')}
                value={faq.question}
              />
              <AppTextArea
                errorMsg={
                  faqErrors[index]?.answer
                    ? t(faqErrors[index].answer)
                    : undefined
                }
                fullWidth
                maxLength={FIELD_LIMITS.ANSWER_MAX_LENGTH}
                onBlur={() => handleFaqFieldBlur(index, 'answer')}
                onChange={(e) =>
                  handleFaqChange(index, 'answer', e.target.value)
                }
                placeholder={t('offerPage.labels.answer')}
                value={faq.answer}
              />
            </Box>
            <IconButton
              disabled={faqList.length <= 1}
              onClick={() => handleRemoveFaq(index)}
              size={SizeEnum.Small}
            >
              <CloseRounded fontSize={SizeEnum.Small} />
            </IconButton>
          </Box>
        ))}

        <Button
          disabled={faqList.length >= FAQ_LIMITS.MAX}
          onClick={handleAddFaq}
          sx={{ width: '50%' }}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('offerPage.createOffer.buttonTitles.addQuestion')}
        </Button>
      </Box>
    </Box>
  )
}

export default ThirdStepFaq
