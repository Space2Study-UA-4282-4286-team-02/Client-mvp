import { screen, fireEvent, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'
import ThirdStepFaq from '~/containers/find-offer/offer-request-form/ThirdStepFaq'
import { renderWithProviders } from '~/tests/test-utils'
import { UserRoleEnum } from '~/types'
import userEvent from '@testing-library/user-event'

const mockT = (key) => key

const mockData = {
  FAQ: [{ question: '', answer: '' }]
}

const mockErrors = {}

const handleNonInputValueChange = vi.fn()
const handleErrors = vi.fn()

describe('ThirdStepFaq test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <ThirdStepFaq
        data={mockData}
        errors={mockErrors}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('offerPage.title.thirdStep')

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    const description = screen.getByText(
      'offerPage.description.thirdStep.student'
    )

    expect(description).toBeInTheDocument()
  })

  it('should render initial FAQ fields', () => {
    const questionInput = screen.getByPlaceholderText(
      'offerPage.labels.question'
    )
    const answerInput = screen.getByPlaceholderText('offerPage.labels.answer')

    expect(questionInput).toBeInTheDocument()
    expect(answerInput).toBeInTheDocument()
  })

  it('should render add question button', () => {
    const addButton = screen.getByText(
      'offerPage.createOffer.buttonTitles.addQuestion'
    )

    expect(addButton).toBeInTheDocument()
  })

  it('should call handleNonInputValueChange when adding FAQ', () => {
    const addButton = screen.getByText(
      'offerPage.createOffer.buttonTitles.addQuestion'
    )

    fireEvent.click(addButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      { question: '', answer: '' },
      { question: '', answer: '' }
    ])
  })

  it('should call handleNonInputValueChange when question changes', async () => {
    const user = userEvent.setup()
    const questionInput = screen.getByPlaceholderText(
      'offerPage.labels.question'
    )

    await user.type(questionInput, 'Test Question')

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should call handleNonInputValueChange when answer changes', async () => {
    const user = userEvent.setup()
    const answerInput = screen.getByPlaceholderText('offerPage.labels.answer')

    await user.type(answerInput, 'Test Answer')

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should disable remove button when only one FAQ exists', () => {
    const removeButton = screen.getByRole('button', { name: '' })

    expect(removeButton).toBeDisabled()
  })
})

describe('ThirdStepFaq with multiple FAQs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <ThirdStepFaq
        data={{
          FAQ: [
            { question: 'Question 1', answer: 'Answer 1' },
            { question: 'Question 2', answer: 'Answer 2' }
          ]
        }}
        errors={mockErrors}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display all FAQ items', () => {
    const questionInputs = screen.getAllByPlaceholderText(
      'offerPage.labels.question'
    )

    expect(questionInputs).toHaveLength(2)
  })

  it('should enable remove buttons when multiple FAQs exist', () => {
    const removeButtons = screen.getAllByRole('button', { name: '' })
    const actualRemoveButtons = removeButtons.filter((btn) => !btn.disabled)

    expect(actualRemoveButtons.length).toBeGreaterThan(0)
  })

  it('should call handleNonInputValueChange when removing FAQ', () => {
    const removeButtons = screen.getAllByRole('button', { name: '' })
    const enabledButton = removeButtons.find((btn) => !btn.disabled)

    fireEvent.click(enabledButton)

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })
})

describe('ThirdStepFaq with maximum FAQs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <ThirdStepFaq
        data={{
          FAQ: [
            { question: 'Q1', answer: 'A1' },
            { question: 'Q2', answer: 'A2' },
            { question: 'Q3', answer: 'A3' },
            { question: 'Q4', answer: 'A4' },
            { question: 'Q5', answer: 'A5' }
          ]
        }}
        errors={mockErrors}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display all 5 FAQ items', () => {
    const questionInputs = screen.getAllByPlaceholderText(
      'offerPage.labels.question'
    )

    expect(questionInputs).toHaveLength(5)
  })

  it('should disable add button when maximum FAQs reached', () => {
    const addButton = screen.getByText(
      'offerPage.createOffer.buttonTitles.addQuestion'
    )

    expect(addButton).toBeDisabled()
  })
})

describe('ThirdStepFaq with filled data', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <ThirdStepFaq
        data={{
          FAQ: [
            { question: 'What is this?', answer: 'This is a test' },
            { question: 'How does it work?', answer: 'It works well' }
          ]
        }}
        errors={mockErrors}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display filled question values', () => {
    const questionInputs = screen.getAllByPlaceholderText(
      'offerPage.labels.question'
    )

    expect(questionInputs[0]).toHaveValue('What is this?')
    expect(questionInputs[1]).toHaveValue('How does it work?')
  })

  it('should display filled answer values', () => {
    const answerInputs = screen.getAllByPlaceholderText(
      'offerPage.labels.answer'
    )

    expect(answerInputs[0]).toHaveValue('This is a test')
    expect(answerInputs[1]).toHaveValue('It works well')
  })
})

describe('ThirdStepFaq validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <ThirdStepFaq
        data={{
          FAQ: [{ question: '', answer: '' }]
        }}
        errors={mockErrors}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should show error when question field loses focus while empty', async () => {
    const questionInput = screen.getByPlaceholderText(
      'offerPage.labels.question'
    )

    fireEvent.blur(questionInput)

    await waitFor(() => {
      const errorMessage = screen.queryByText('common.errorMessages.emptyField')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('should show error when answer field loses focus while empty', async () => {
    const answerInput = screen.getByPlaceholderText('offerPage.labels.answer')

    fireEvent.blur(answerInput)

    await waitFor(() => {
      const errorMessage = screen.queryByText('common.errorMessages.emptyField')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('should call handleErrors when all FAQs are valid', async () => {
    const user = userEvent.setup()
    const questionInput = screen.getByPlaceholderText(
      'offerPage.labels.question'
    )
    const answerInput = screen.getByPlaceholderText('offerPage.labels.answer')

    await user.type(questionInput, 'Valid Question')
    await user.type(answerInput, 'Valid Answer')

    expect(handleErrors).toHaveBeenCalled()
  })
})
