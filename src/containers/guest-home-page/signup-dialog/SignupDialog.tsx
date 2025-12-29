import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import imgInfo from '~/assets/img/guest-home-page/info.svg'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import GoogleLogin from '../google-login/GoogleLogin'
import SignupForm from '../signup-form/SignupForm'
import { signup, snackbarVariants } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import useForm from '~/hooks/use-form'
import { useSignUpMutation } from '~/services/auth-service'
import { UserRoleEnum } from '~/types'
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/login'

import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'
import NotificationModal from '../notification-modal/NotificationModal'

interface SignupDialogProps {
  role: UserRoleEnum
}

const SignupDialog: FC<SignupDialogProps> = ({ role }) => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signupUser] = useSignUpMutation()

  const {
    handleSubmit,
    handleInputChange,
    handleBlur,
    data,
    errors,
    handleErrors
  } = useForm({
    onSubmit: async () => {
      try {
        await signupUser({
          ...data,
          role: role
        }).unwrap()
        closeModal()
        setTimeout(
          () =>
            openModal({
              component: (
                <NotificationModal
                  buttonTitle={t('common.confirmButton')}
                  description={
                    <>
                      {t('signup.confirmEmailMessage')}
                      <strong>{`${data.email}`}</strong>
                      {t('signup.confirmEmailDesc')}
                    </>
                  }
                  img={imgInfo}
                  onClose={closeModal}
                  title={t('signup.confirmEmailTitle')}
                />
              )
            }),
          0
        )
      } catch (err) {
        const code =
          (err as { data?: { code?: string } })?.data?.code ?? 'UNKNOWN_ERROR'
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${code}`
        })
      }
    },
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      iAgree: false
    },
    validations: {
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    }
  })

  useEffect(() => {
    if (errors.confirmPassword || errors.password) {
      const confirmError = confirmPassword(data.confirmPassword, data)
      if (confirmError !== errors.confirmPassword) {
        handleErrors('confirmPassword', confirmError || '')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.password, data.confirmPassword])

  const image = role === UserRoleEnum.Tutor ? tutorImg : studentImg
  const headingKey =
    role === UserRoleEnum.Tutor ? 'signup.head.tutor' : 'signup.head.student'

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='signup' component='img' src={image} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(headingKey)}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={role}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
