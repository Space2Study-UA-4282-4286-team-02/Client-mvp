import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import FirstStepSpecialization from '~/containers/find-offer/offer-request-form/FirstStepSpecialization'
import { vi } from 'vitest'
import { ProficiencyLevelEnum, UserRoleEnum } from '~/types'

vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')

const mockT = (key) => key

const mockData = {
  category: null,
  subject: null,
  proficiencyLevel: ''
}

const mockErrors = {}

const handleBlur = vi.fn(() => vi.fn())
const handleNonInputValueChange = vi.fn()
const handleErrors = vi.fn()

describe('FirstStepSpecialization test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <FirstStepSpecialization
        data={mockData}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('offerPage.title.firstStep.student')

    expect(title).toBeInTheDocument()
  })

  it('should render category autocomplete', () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    expect(categoryInput).toBeInTheDocument()
  })

  it('should render subject autocomplete', () => {
    const subjectInput = screen.getByLabelText('offerPage.labels.subject')

    expect(subjectInput).toBeInTheDocument()
  })

  it('should have subject disabled when category not selected', () => {
    const subjectInput = screen.getByLabelText('offerPage.labels.subject')

    expect(subjectInput).toBeDisabled()
  })

  it('should render all proficiency level radio buttons', () => {
    const radioButtons = screen.getAllByRole('radio')

    expect(radioButtons).toHaveLength(6)
  })

  it('should call handlers when proficiency level selected', () => {
    const radioButton = screen.getByRole('radio', {
      name: 'common.levels.beginner'
    })
    fireEvent.click(radioButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith(
      'proficiencyLevel',
      ProficiencyLevelEnum.Beginner
    )
    expect(handleErrors).toHaveBeenCalledWith('proficiencyLevel', '')
  })
})

describe('FirstStepSpecialization with category selected', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <FirstStepSpecialization
        data={{ ...mockData, category: '1' }}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should have subject enabled when category selected', () => {
    const subjectInput = screen.getByLabelText('offerPage.labels.subject')

    expect(subjectInput).not.toBeDisabled()
  })
})

describe('FirstStepSpecialization with selected proficiency level', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <FirstStepSpecialization
        data={{ ...mockData, proficiencyLevel: ProficiencyLevelEnum.Beginner }}
        errors={mockErrors}
        handleBlur={handleBlur}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display selected proficiency level', () => {
    const radioButton = screen.getByRole('radio', {
      name: 'common.levels.beginner'
    })

    expect(radioButton).toBeChecked()
  })
})

describe('FirstStepSpecialization with errors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(
      <FirstStepSpecialization
        data={mockData}
        errors={{ proficiencyLevel: 'common.errorMessages.emptyField' }}
        handleBlur={handleBlur}
        handleErrors={handleErrors}
        handleNonInputValueChange={handleNonInputValueChange}
        t={mockT}
        userRole={UserRoleEnum.Student}
      />
    )
  })

  it('should display error message', () => {
    const errorMessage = screen.getByText('common.errorMessages.emptyField')

    expect(errorMessage).toBeInTheDocument()
  })
})
