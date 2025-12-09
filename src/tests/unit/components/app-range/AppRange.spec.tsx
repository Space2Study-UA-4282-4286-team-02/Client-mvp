import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AppRange from '~/components/app-range/AppRange'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.from': 'From',
        'common.to': 'To'
      }
      return translations[key] ?? key
    }
  })
}))

let sliderChangeValue: [number, number] = [0, 0]

vi.mock('@mui/material/Slider', () => ({
  __esModule: true,
  default: (props: { onChange?: (event: Event, value: number[]) => void }) => (
    <button
      data-testid='slider'
      onClick={(event) =>
        props.onChange?.(event as unknown as Event, sliderChangeValue)
      }
      type='button'
    >
      slider
    </button>
  )
}))

const renderComponent = (overrideProps = {}) => {
  const props = {
    min: 0,
    max: 100,
    value: [10, 90] as [number, number],
    onChange: vi.fn(),
    ...overrideProps
  }

  render(<AppRange {...props} />)

  return props
}

const flushDebounce = () => {
  act(() => {
    vi.runAllTimers()
  })
}

describe('AppRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sliderChangeValue = [0, 0]
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    renderComponent()

    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
    expect(screen.getByText('from')).toBeInTheDocument()
    expect(screen.getByText('to')).toBeInTheDocument()
  })

  it('calls onChange when slider is moved', () => {
    const props = renderComponent()

    sliderChangeValue = [25, 75]

    fireEvent.click(screen.getByTestId('slider'))
    flushDebounce()

    expect(props.onChange).toHaveBeenCalledWith([25, 75])
  })

  it('calls onChange when input value changes', () => {
    const props = renderComponent()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '30' } })

    flushDebounce()

    expect(props.onChange).toHaveBeenCalledWith([30, 90])
  })

  it('does not call onChange when input value is not a number', () => {
    const props = renderComponent()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'abc' } })

    flushDebounce()

    expect(props.onChange).not.toHaveBeenCalled()
  })

  it('calls onChange with min value when input is cleared', () => {
    const props = renderComponent()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '' } })

    flushDebounce()

    expect(props.onChange).toHaveBeenCalledWith([0, 90])
  })

  it('updates input value to max when blurred with value higher than max', () => {
    renderComponent()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[1], { target: { value: '150' } })

    flushDebounce()
    fireEvent.blur(inputs[1])

    expect(inputs[1]).toHaveValue('100')
  })

  it('does not update prices when blurred without value change', () => {
    const props = renderComponent()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.blur(inputs[0])

    expect(inputs[0]).toHaveValue('10')
    expect(props.onChange).not.toHaveBeenCalled()
  })
})
