import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

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

interface SignupDialogProps {
  role: UserRoleEnum
}

const SignupDialog: FC<SignupDialogProps> = ({ role }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signupUser] = useSignUpMutation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signupUser({
            ...data,
            confirmPassword: data.password,
            role: role
          }).unwrap()
          closeModal()
        } catch (err) {
          const code =
            (err as { data?: { code?: string } })?.data?.code ?? 'unknown'
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
      validations: { email, firstName, lastName, password, confirmPassword }
    }
  )
  const image = role === UserRoleEnum.Tutor ? tutorImg : studentImg
  const headingKey =
    role === UserRoleEnum.Tutor ? 'signup.head.tutor' : 'signup.head.student'

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='singup' component='img' src={image} sx={styles.img} />
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
