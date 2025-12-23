import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useAppSelector } from '~/hooks/use-redux'
import { guestRoutes } from '~/router/constants/guestRoutes'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

interface SignupFormProps {
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => void
  handleChange: (
    key:
      | 'email'
      | 'password'
      | 'confirmPassword'
      | 'firstName'
      | 'lastName'
      | 'iAgree'
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    key: 'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName'
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  data: {
    iAgree: boolean
    firstName?: string
    lastName?: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: {
    email?: string
    password?: string
    confirmPassword?: string
    firstName?: string
    lastName?: string
  }
}

const SignupForm: FC<SignupFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const { authLoading } = useAppSelector((state) => state.appMain)

  const isDisabled =
    data.email.trim() === '' ||
    data.password.trim() === '' ||
    data.confirmPassword.trim() === '' ||
    !data.firstName?.trim() ||
    !data.lastName?.trim() ||
    !data.iAgree ||
    Object.values(errors).some(Boolean)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={{ display: 'flex', gap: '15px', mb: '8px' }}>
        <AppTextField
          autoComplete='given-name'
          autoFocus
          data-testid='firstName'
          errorMsg={errors.firstName ? t(errors.firstName) : undefined}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={{ flex: 1 }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          autoComplete='family-name'
          data-testid='lastName'
          errorMsg={errors.lastName ? t(errors.lastName) : undefined}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={{ flex: 1 }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        autoComplete='email'
        data-testid={'email'}
        errorMsg={errors.email ? t(errors.email) : undefined}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='medium'
        sx={{ mb: '8px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        autoComplete='new-password'
        data-testid='password'
        errorMsg={errors.password ? t(errors.password) : undefined}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '8px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        autoComplete='new-password'
        data-testid='confirmPassword'
        errorMsg={
          errors.confirmPassword ? t(errors.confirmPassword) : undefined
        }
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <Box sx={{ mb: '12px' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!data.iAgree}
              color='primary'
              data-testid='iAgree'
              onChange={handleChange('iAgree')}
            />
          }
          label={
            <span>
              <Typography
                component='span'
                sx={styles.terms}
                variant='subtitle2'
              >
                {t('signup.iAgree')}
              </Typography>{' '}
              <Typography
                component={Link}
                sx={styles.termsLink}
                to={guestRoutes.termOfUse.path}
                variant='subtitle2'
              >
                {t('common.labels.terms')}
              </Typography>{' '}
              <Typography
                component='span'
                sx={styles.terms}
                variant='subtitle2'
              >
                {t('signup.and')}
              </Typography>{' '}
              <Typography
                component={Link}
                sx={styles.termsLink}
                to={guestRoutes.privacyPolicy.path}
                variant='subtitle2'
              >
                {t('common.labels.privacyPolicy')}
              </Typography>
            </span>
          }
        />
      </Box>

      <AppButton
        disabled={isDisabled}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
