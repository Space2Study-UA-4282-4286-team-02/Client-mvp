import { render, screen } from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  })
}))

describe('SearchFilterInput', () => {
  const updateFilterMock = vi.fn()

  const defaultProps = {
    updateFilter: updateFilterMock,
    textFieldProps: {}
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render component with input in it', () => {
    render(<SearchFilterInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input).toBeInTheDocument()
  })

  it('should render typed text correctly', async () => {
    render(<SearchFilterInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'text')

    expect(input.value).toBe('text')
  })

  it('should delete typed text when delete button is clicked', async () => {
    render(<SearchFilterInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'text')
    const button = screen.getByTestId('clearIcon') as HTMLButtonElement

    await userEvent.click(button)

    expect(input.value).toBe('')
    expect(updateFilterMock).toHaveBeenCalledWith('')

  })

  it('should call updateFilter function on search button click', async () => {
    render(<SearchFilterInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'text')
    const searchButton = screen.getByText('common.search')
    await userEvent.click(searchButton)

    expect(updateFilterMock).toHaveBeenCalled()
    expect(updateFilterMock).toHaveBeenCalledWith('text')
  })

  it('should call updateFilter function when enter is pressed', async () => {
    render(<SearchFilterInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    input.focus()
    await userEvent.type(input, 'text')
    await userEvent.keyboard('{Enter}')

    expect(updateFilterMock).toHaveBeenCalled()
    expect(updateFilterMock).toHaveBeenCalledWith('text')
  })
})