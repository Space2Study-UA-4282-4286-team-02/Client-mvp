import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { vi } from 'vitest'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})

const errors = {
  email: false,
  password: false,
  confirmPassword: false,
  firstName: false,
  lastName: false
}
const data = {
  iAgree: true,
  firstName: 'nameTest',
  lastName: 'nameTest',
  email: 'email@mail.com',
  password: 'passTest1',
  confirmPassword: 'passTest1'
}
const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()

describe('Signup form test', () => {
  const preloadedState = { appMain: { authLoading: false } }
  beforeEach(() => {
    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )
  })

  it('should render firstname input label', () => {
    const inputLabel = screen.getByTestId('firstName')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render lastName input label', () => {
    const inputLabel = screen.getByTestId('lastName')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render email input label', () => {
    const inputLabel = screen.getByTestId('email')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render password input label', () => {
    const inputLabel = screen.getByTestId('password')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render confirmPassword input label', () => {
    const inputLabel = screen.getByTestId('confirmPassword')

    expect(inputLabel).toBeInTheDocument()
  })

  it('should render signup button', () => {
    const button = screen.getByText('common.labels.signup')

    expect(button).toBeInTheDocument()
  })

  it('should show visibility icon', async () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcons[0])
    const visibilityIcon = screen.getByTestId('VisibilityIcon')

    await waitFor(() => {
      expect(visibilityIcon).toBeInTheDocument()
    })
  })

  it('should submit', async () => {
    handleSubmit.mockImplementation((event) => {
      event.preventDefault()
    })
    const button = screen.getByText('common.labels.signup')
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should check iAgree checkbox', async () => {
    const checkbox = screen.getByTestId('iAgree')
    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })
  })
})

describe('Signup form test with loading', () => {
  const preloadedState = { appMain: { authLoading: true } }
  it('should render loader', () => {
    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
