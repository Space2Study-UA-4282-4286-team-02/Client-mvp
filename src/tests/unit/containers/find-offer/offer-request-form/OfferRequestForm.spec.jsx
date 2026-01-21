import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import OfferRequestForm from '~/containers/find-offer/offer-request-form/OfferRequestForm'
import { renderWithProviders } from '~/tests/test-utils'
import { UserRoleEnum } from '~/types'
import * as snackbarContext from '~/context/snackbar-context'

vi.mock('~/services/offer-service', () => ({
  offerService: {
    createOffer: vi.fn()
  }
}))

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategories: vi.fn(() => Promise.resolve({ items: [] }))
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: vi.fn(() => Promise.resolve({ items: [] }))
  }
}))

const mockCloseDrawer = vi.fn()
const mockSetAlert = vi.fn()

const renderForm = (userRole = UserRoleEnum.Student) => {
  return renderWithProviders(
    <OfferRequestForm closeDrawer={mockCloseDrawer} />,
    {
      preloadedState: {
        appMain: { userRole }
      }
    }
  )
}

describe('OfferRequestForm test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(snackbarContext, 'useSnackBarContext').mockReturnValue({
      setAlert: mockSetAlert
    })
  })

  it('should render form title for student', () => {
    renderForm(UserRoleEnum.Student)

    expect(
      screen.getByText('offerPage.createOffer.title.student')
    ).toBeInTheDocument()
  })

  it('should render form title for tutor', () => {
    renderForm(UserRoleEnum.Tutor)

    expect(
      screen.getByText('offerPage.createOffer.title.tutor')
    ).toBeInTheDocument()
  })

  it('should render form description', () => {
    renderForm()

    expect(
      screen.getByText('offerPage.createOffer.description.student')
    ).toBeInTheDocument()
  })

  it('should render all three sections', () => {
    renderForm()

    expect(
      screen.getByText('offerPage.title.firstStep.student')
    ).toBeInTheDocument()
    expect(
      screen.getByText('offerPage.title.secondStep.student')
    ).toBeInTheDocument()
    expect(screen.getByText('offerPage.title.thirdStep')).toBeInTheDocument()
  })

  it('should render as form element', () => {
    const { container } = renderForm()

    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('should render submit button for student', () => {
    renderForm(UserRoleEnum.Student)

    expect(
      screen.getByText('offerPage.createOffer.buttonTitles.student')
    ).toBeInTheDocument()
  })

  it('should render submit button for tutor', () => {
    renderForm(UserRoleEnum.Tutor)

    expect(
      screen.getByText('offerPage.createOffer.buttonTitles.tutor')
    ).toBeInTheDocument()
  })

  it('should render draft button', () => {
    renderForm()

    expect(
      screen.getByText('offerPage.createOffer.buttonTitles.addToDrafts')
    ).toBeInTheDocument()
  })

  it('should have submit button disabled when form is empty', () => {
    renderForm()

    const submitButton = screen.getByText(
      'offerPage.createOffer.buttonTitles.student'
    )

    expect(submitButton.closest('button')).toBeDisabled()
  })
})
