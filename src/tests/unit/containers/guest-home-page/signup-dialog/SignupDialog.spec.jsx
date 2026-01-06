import { screen, fireEvent, waitFor } from '@testing-library/react'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { accessToken } from '~tests/unit/redux/redux.variables'
import { UserRoleEnum } from '~/types'

const unwrap = vi.fn().mockResolvedValue({ accessToken })
const signupUser = vi.fn().mockReturnValue({ unwrap })

const mockState = {
  appMain: { authLoading: false }
}

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: (selector) => selector(mockState)
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

vi.mock('~/containers/guest-home-page/google-login/GoogleLogin', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

vi.mock('~/services/auth-service', async () => {
  const actual = await vi.importActual('~/services/auth-service')
  return {
    ...actual,
    useSignUpMutation: () => [signupUser]
  }
})

describe('Signup dialog test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<SignupDialog role={UserRoleEnum.Student} />)
  })

  it('should render img', () => {
    const img = screen.getByAltText(/signup/i)

    expect(img).toBeInTheDocument()
  })

  it('should render head text', () => {
    const text = screen.getByText(/signup.head.student/i)

    expect(text).toBeInTheDocument()
  })

  it('should change firstName value', () => {
    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)
    fireEvent.change(inputFirstName, { target: { value: 'John' } })

    expect(inputFirstName.value).toBe('John')
  })

  it('should change lastName value', () => {
    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)
    fireEvent.change(inputLastName, { target: { value: 'Doe' } })

    expect(inputLastName.value).toBe('Doe')
  })

  it('should change email value', () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })

    expect(inputEmail.value).toBe('test@mail.com')
  })

  it('should change password value', () => {
    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: 'test' } })

    expect(inputPassword.value).toBe('test')
  })

  it('should change confirmPassword value', () => {
    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    fireEvent.change(inputConfirmPassword, { target: { value: 'test' } })

    expect(inputConfirmPassword.value).toBe('test')
  })

  it('should show error', () => {
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.focusOut(inputEmail)

    const error = screen.getByText('common.errorMessages.emptyField')

    expect(error).toBeInTheDocument()
  })

  it('should dispatch after button submit', async () => {
    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)
    fireEvent.change(inputFirstName, { target: { value: 'John' } })

    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)
    fireEvent.change(inputLastName, { target: { value: 'Doe' } })

    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'test@gmail.com' } })

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    fireEvent.change(inputPassword, { target: { value: '12345678a/A' } })

    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678a/A' } })

    const checkbox = screen.getByTestId('iAgree')
    fireEvent.click(checkbox)

    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)

    await waitFor(() => {
      expect(signupUser).toHaveBeenCalledTimes(1)
      expect(signupUser).toHaveBeenCalledWith(
        expect.objectContaining({
          role: UserRoleEnum.Student,
          email: 'test@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          password: '12345678a/A',
          confirmPassword: '12345678a/A',
          iAgree: true
        })
      )
    })
  })
})
