import { screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'
import SecondStepParameters from '~/containers/find-offer/offer-request-form/SecondStepParameters'
import { renderWithProviders } from '~/tests/test-utils'
import { UserRoleEnum, LanguagesEnum } from '~/types'
import userEvent from '@testing-library/user-event'

const mockT = (key) => key

const mockData = {
  title: '',
  description: '',
  languages: [],
  price: 0
}

const mockErrors = {}

const handleBlur = vi.fn(() => vi.fn())
const handleNonInputValueChange = vi.fn()

describe('SecondStepParameters test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <SecondStepParameters
        data={mockData}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('offerPage.title.secondStep.student')

    expect(title).toBeInTheDocument()
  })

  it('should render title text area', () => {
    const titleInput = screen.getByLabelText('offerPage.labels.title')

    expect(titleInput).toBeInTheDocument()
  })

  it('should render description text area', () => {
    const descriptionInput = screen.getByPlaceholderText(
      'offerPage.labels.describe.student'
    )

    expect(descriptionInput).toBeInTheDocument()
  })

  it('should render language select', () => {
    const languageSelect = screen.getByLabelText('offerPage.labels.language')

    expect(languageSelect).toBeInTheDocument()
  })

  it('should render price text field', () => {
    const priceInput = screen.getByRole('spinbutton')

    expect(priceInput).toBeInTheDocument()
  })

  it('should call handleNonInputValueChange when title changes', async () => {
    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('offerPage.labels.title')

    await user.type(titleInput, 'New Title')

    expect(handleNonInputValueChange).toHaveBeenCalledTimes(9)
  })

  it('should call handleNonInputValueChange when description changes', async () => {
    const user = userEvent.setup()
    const descriptionInput = screen.getByPlaceholderText(
      'offerPage.labels.describe.student'
    )

    await user.type(descriptionInput, 'New Description')

    expect(handleNonInputValueChange).toHaveBeenCalledTimes(15)
  })

  it('should call handleNonInputValueChange when price changes', async () => {
    const user = userEvent.setup()
    const priceInput = screen.getByRole('spinbutton')

    await user.type(priceInput, '100')

    expect(handleNonInputValueChange).toHaveBeenCalledTimes(3)
  })
})

describe('SecondStepParameters with selected languages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <SecondStepParameters
        data={{
          ...mockData,
          languages: [LanguagesEnum.English, LanguagesEnum.Ukrainian]
        }}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display language chips', () => {
    const englishChip = screen.getByText('common.languages.english')
    const ukrainianChip = screen.getByText('common.languages.ukrainian')

    expect(englishChip).toBeInTheDocument()
    expect(ukrainianChip).toBeInTheDocument()
  })

  it('should call handleNonInputValueChange when removing a language', () => {
    const deleteButtons = screen.getAllByTestId('close-btn')

    fireEvent.click(deleteButtons[0])

    expect(handleNonInputValueChange).toHaveBeenCalledWith('languages', [
      LanguagesEnum.Ukrainian
    ])
  })
})

describe('SecondStepParameters with filled data', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <SecondStepParameters
        data={{
          title: 'Test Title',
          description: 'Test Description',
          languages: [LanguagesEnum.English],
          price: 500
        }}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display filled title', () => {
    const titleInput = screen.getByLabelText('offerPage.labels.title')

    expect(titleInput).toHaveValue('Test Title')
  })

  it('should display filled description', () => {
    const descriptionInput = screen.getByPlaceholderText(
      'offerPage.labels.describe.student'
    )

    expect(descriptionInput).toHaveValue('Test Description')
  })

  it('should display filled price', () => {
    const priceInput = screen.getByRole('spinbutton')

    expect(priceInput).toHaveValue(500)
  })
})

describe('SecondStepParameters with errors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <SecondStepParameters
        data={mockData}
        errors={{
          title: 'common.errorMessages.emptyField',
          description: 'common.errorMessages.emptyField',
          languages: 'common.errorMessages.emptyField',
          price: 'common.errorMessages.invalidPrice'
        }}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display title error message', () => {
    const errorMessages = screen.getAllByText('common.errorMessages.emptyField')

    expect(errorMessages.length).toBeGreaterThan(0)
  })

  it('should display price error message', () => {
    const priceError = screen.getByText('common.errorMessages.invalidPrice')

    expect(priceError).toBeInTheDocument()
  })
})
