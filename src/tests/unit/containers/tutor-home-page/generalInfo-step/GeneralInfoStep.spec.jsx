import { vi, expect, it, describe, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { StepProvider } from '~/context/step-context'
import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { useGetMeQuery } from '~/services/auth-service'

const mockHandleStepData = vi.fn()

vi.mock('~/services/auth-service')
vi.mock('~/context/step-context', async () => {
  const actual = await vi.importActual('~/context/step-context')

  return {
    ...actual,
    useStepContext: () => ({
      stepData: {
        generalInfo: { data: {} }
      },
      handleStepData: mockHandleStepData
    })
  }
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))
vi.mock('~/components/select-location/CountrySelect', () => ({
  default: ({ setCountry }) => (
    <button onClick={() => setCountry({ name: 'Ukraine', iso2: 'UA' })}>
      Set Country
    </button>
  )
}))
vi.mock('~/components/select-location/CitySelect', () => ({
  default: ({ city, countryCode, setCity }) => (
    <div data-testid='city-select-wrapper'>
      <span data-testid='current-city'>{city}</span>
      <span data-testid='current-country-code'>{countryCode}</span>
      <button onClick={() => setCity('Kyiv')}>Set City</button>
    </div>
  )
}))

const mockBtnsBox = <button data-testid='next-btn'>Next</button>

describe('GeneralInfoStep Component', () => {
  const mockSetIsUserFetched = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useGetMeQuery.mockReturnValue({
      data: { firstName: 'Ivan', lastName: 'Marchuk' },
      isLoading: false
    })
  })

  it('should render all input fields', () => {
    render(
      <StepProvider stepLabels={tutorStepLabels}>
        <GeneralInfoStep
          btnbox={mockBtnsBox}
          isUserFetched
          setIsUserFetched={mockSetIsUserFetched}
        />
      </StepProvider>
    )

    expect(screen.getByTestId('firstName')).toBeInTheDocument()
    expect(screen.getByTestId('lastName')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('becomeTutor.generalInfo.textFieldLabel')
    ).toBeInTheDocument()
  })

  it('should update country and reset city when country changes', async () => {
    render(
      <StepProvider stepLabels={tutorStepLabels}>
        <GeneralInfoStep
          btnsBox={mockBtnsBox}
          isUserFetched
          setIsUserFetched={mockSetIsUserFetched}
        />
      </StepProvider>
    )

    fireEvent.click(screen.getByText('Set Country'))
    fireEvent.click(screen.getByText('Set City'))
    fireEvent.click(screen.getByText('Set Country'))
    expect(screen.getByTestId('current-country-code').textContent).toBe('UA')
    expect(screen.getByTestId('current-city').textContent).toBe('')
  })

  it('should update professional summary and show character count', () => {
    render(
      <StepProvider stepLabels={tutorStepLabels}>
        <GeneralInfoStep
          btnsBox={mockBtnsBox}
          isUserFetched
          setIsUserFetched={mockSetIsUserFetched}
        />
      </StepProvider>
    )

    const textArea = screen.getByPlaceholderText(
      'becomeTutor.generalInfo.textFieldLabel'
    )
    fireEvent.change(textArea, { target: { value: 'Experienced tutor' } })

    expect(screen.getByText('17/100')).toBeInTheDocument()
  })

  it('should call handleStepData when Next button is clicked', () => {
    render(
      <GeneralInfoStep
        btnsBox={mockBtnsBox}
        isUserFetched
        setIsUserFetched={mockSetIsUserFetched}
      />
    )
    const firstName = screen.getByTestId('firstName').querySelector('input')
    const lastName = screen.getByTestId('lastName').querySelector('input')
    fireEvent.change(firstName, { target: { value: 'Ivan' } })
    fireEvent.change(lastName, { target: { value: 'Marchuk' } })

    fireEvent.click(screen.getByText('Set Country'))
    fireEvent.click(screen.getByText('Set City'))

    const textArea = screen.getByPlaceholderText(
      'becomeTutor.generalInfo.textFieldLabel'
    )
    fireEvent.change(textArea, {
      target: { value: 'I am an experienced math tutor.' }
    })

    fireEvent.click(screen.getByTestId('next-btn'))

    expect(mockHandleStepData).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        firstName: 'Ivan',
        lastName: 'Marchuk',
        country: 'Ukraine',
        countryCode: 'UA',
        city: 'Kyiv',
        professionalSummary: 'I am an experienced math tutor.'
      })
    )
  })
})
