import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { SwitchOptions } from '~/types'

describe('AppContentSwitcher', () => {
  const mockOnChange = vi.fn()

  const switchOptions: SwitchOptions = {
    left: { text: 'Left Text', tooltip: 'Left Tooltip' },
    right: { text: 'Right Text', tooltip: 'Right Tooltip' }
  }

  const defaultProps = {
    active: true,
    onChange: mockOnChange,
    switchOptions,
    typographyVariant: 'body1' as const
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with the correct props', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    expect(screen.getByText('Left Text')).toBeInTheDocument()
    expect(screen.getByText('Right Text')).toBeInTheDocument()

    // MUI Switch uses role="checkbox"
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should call the onChange function when the switch is clicked', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    expect(screen.getByLabelText('Left Tooltip')).toBeInTheDocument()
    expect(screen.getByLabelText('Right Tooltip')).toBeInTheDocument()
  })
})
