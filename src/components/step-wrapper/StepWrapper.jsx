import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import useSteps from '~/hooks/use-steps'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'

const StepWrapper = ({ children, steps }) => {
  const { activeStep, stepErrors, isLastStep, loading, stepOperation } =
    useSteps({
      steps
    })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const BtnsBox = ({ disabled, onClick }) => (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>

      <AppButton
        disabled={disabled}
        loading={loading}
        onClick={() => {
          if (onClick) onClick()
          isLastStep ? handleSubmit() : next()
        }}
        size='small'
        sx={isLastStep ? styles.finishBtn : styles.btn}
        variant='contained'
      >
        {isLastStep ? t('common.finish') : t('common.next')}
        {!isLastStep && <EastIcon fontSize='small' />}
      </AppButton>
    </Box>
  )

  const stepLabels = steps.map((step, index) => (
    <Box
      color={stepErrors[index] ? 'error.500' : 'primary.500'}
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox: <BtnsBox />,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
