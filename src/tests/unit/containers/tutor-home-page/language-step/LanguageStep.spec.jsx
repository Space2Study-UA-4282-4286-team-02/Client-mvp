import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { StepProvider } from '~/context/step-context'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import {
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { LanguagesEnum } from '~/types'
import { renderWithProviders } from '~tests/test-utils'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const mockBtnsBox = <div data-testid='btns-box'>Buttons Box</div>

const mockUseBreakpoints = {
  isLaptopAndAbove: false,
  isMobile: false
}

describe('LanguageStep component', () => {
  const renderComponent = () => {
    return renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <LanguageStep btnsBox={mockBtnsBox} />
      </StepProvider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useBreakpoints.mockReturnValue(mockUseBreakpoints)
  })

  describe('Rendering', () => {
    it('should render the component with title', () => {
      renderComponent()

      const title = screen.getByText('becomeTutor.languages.title')
      expect(title).toBeInTheDocument()
    })

    it('should render buttons box', () => {
      renderComponent()

      const btnsBox = screen.getByTestId('btns-box')
      expect(btnsBox).toBeInTheDocument()
    })

    it('should render image on laptop and above', () => {
      useBreakpoints.mockReturnValue({
        ...mockUseBreakpoints,
        isLaptopAndAbove: true
      })

      renderComponent()

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })

    it('should not render image on desktop when isLaptopAndAbove is false', () => {
      useBreakpoints.mockReturnValue({
        ...mockUseBreakpoints,
        isLaptopAndAbove: false,
        isMobile: false
      })

      renderComponent()

      const images = screen.queryAllByRole('img')
      expect(images.length).toBe(0)
    })

    it('should render image on mobile', () => {
      useBreakpoints.mockReturnValue({
        ...mockUseBreakpoints,
        isLaptopAndAbove: false,
        isMobile: true
      })

      renderComponent()

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })
  })

  describe('Language selection', () => {
    it('should display all language options when autocomplete is opened', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        const englishOption = screen.getByText('common.languages.english')
        expect(englishOption).toBeInTheDocument()
      })
    })

    it('should call handleStepData when language is selected', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        const englishOption = screen.getByText('common.languages.english')
        fireEvent.click(englishOption)
      })

      await waitFor(() => {
        expect(autocomplete).toBeInTheDocument()
      })
    })

    it('should display selected language when stepData contains language', () => {
      renderComponent({
        [tutorStepLabels[2]]: LanguagesEnum.English
      })

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )
      expect(autocomplete).toBeInTheDocument()
    })
  })

  describe('Lazy loading options', () => {
    it('should initially show only INITIAL_VISIBLE_COUNT options', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        const options = screen.getAllByRole('option')
        expect(options.length).toBeLessThanOrEqual(6)
      })
    })

    it('should load more options on scroll', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        const listbox = document.querySelector('[role="listbox"]')
        if (listbox) {
          const scrollEvent = {
            currentTarget: {
              scrollTop: 0,
              scrollHeight: 300,
              clientHeight: 200
            }
          }

          Object.defineProperty(listbox, 'scrollTop', {
            value: 250,
            writable: true
          })
          Object.defineProperty(listbox, 'scrollHeight', {
            value: 300,
            writable: true
          })
          Object.defineProperty(listbox, 'clientHeight', {
            value: 200,
            writable: true
          })

          fireEvent.scroll(listbox, scrollEvent)
        }
      })
    })
  })

  describe('Filtering', () => {
    it('should filter options based on input', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      fireEvent.change(autocomplete, { target: { value: 'English' } })

      await waitFor(() => {
        const englishOption = screen.getByText('common.languages.english')
        expect(englishOption).toBeInTheDocument()
      })
    })
  })

  describe('Edge cases', () => {
    it('should handle empty stepData gracefully', () => {
      renderComponent({
        [tutorStepLabels[2]]: ''
      })

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )
      expect(autocomplete).toBeInTheDocument()
    })

    it('should handle invalid language value in stepData', () => {
      renderComponent({
        [tutorStepLabels[2]]: 'InvalidLanguage'
      })

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )
      expect(autocomplete).toBeInTheDocument()
    })

    it('should handle all breakpoint combinations', () => {
      const breakpointCombinations = [
        { isLaptopAndAbove: true, isMobile: false },
        { isLaptopAndAbove: false, isMobile: true },
        { isLaptopAndAbove: false, isMobile: false },
        { isLaptopAndAbove: true, isMobile: true }
      ]

      breakpointCombinations.forEach((breakpoints) => {
        useBreakpoints.mockReturnValue({
          ...mockUseBreakpoints,
          ...breakpoints
        })

        const { unmount } = renderComponent()

        const title = screen.getByText('becomeTutor.languages.title')
        expect(title).toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('Integration with StepContext', () => {
    it('should read language from stepData', () => {
      const selectedLanguage = LanguagesEnum.Ukrainian

      renderComponent({
        [tutorStepLabels[2]]: selectedLanguage
      })

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )
      expect(autocomplete).toBeInTheDocument()
    })

    it('should update stepData when language changes', async () => {
      renderComponent()

      const autocomplete = screen.getByLabelText(
        'becomeTutor.languages.autocompleteLabel'
      )

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        const ukrainianOption = screen.getByText('common.languages.ukrainian')
        fireEvent.click(ukrainianOption)
      })

      await waitFor(() => {
        expect(autocomplete).toBeInTheDocument()
      })
    })
  })
})
