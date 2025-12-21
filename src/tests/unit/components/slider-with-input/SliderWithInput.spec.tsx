import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({ useDebounce: (cb: any) => cb }))
vi.mock('~/assets/img/find-offer/currency_uah.svg', () => ({ default: 'mocked-svg' }))

describe('SliderWithInput', () => {
  const mockOnChange = vi.fn()

  const defaultProps = {
    defaultValue: 100,
    title: 'Price',
    max: 1000,
    min: 0,
    onChange: mockOnChange,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should renders correctly', () => {
    render(<SliderWithInput {...defaultProps} />)

    expect(screen.getByText('Price')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()

  })

  it('should call onChange when slider is moved', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const slider = screen.getByRole('slider')

    act(() => {
      slider.focus()
      fireEvent.change(slider, { target: { value: '101' } })
    })

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should update inputValue correctly when input value is empty', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await act(async () => {
      input.focus()
      await userEvent.clear(input)
      fireEvent.blur(input)
    })

    expect(input.value).toBe('0')
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should not update prices when input is blurred and value in input has not changed', () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    const initialValue = input.value

    act( () => {
      input.focus()
      fireEvent.blur(input)
    })

    expect(input.value).toBe(initialValue)
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    render(<SliderWithInput {...defaultProps} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await act(async () => {
      await userEvent.clear(input)
      await userEvent.type(input, '2000')
      fireEvent.blur(input)
    })

    expect(input.value).toBe('1000')
    expect(mockOnChange).toHaveBeenCalledWith(1000)
  })
})
