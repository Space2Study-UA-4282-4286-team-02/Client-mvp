import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import NoResultsFound from '~/containers/find-offer/no-results-found-block/NoResultsFound'

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ children, ...props }) => (
    <button data-testid='no-results-button' type='button' {...props}>
      {children}
    </button>
  )
}))

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  __esModule: true,
  default: ({ title, description, img, ...props }) => (
    <div data-testid='img-title-description' {...props}>
      <span>{img}</span>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  )
}))

describe('NoResultsFound container', () => {
  const props = {
    image: 'test-image.png',
    title: 'No results title',
    description: 'No results description',
    actionLabel: 'Try again'
  }

  it('renders content and calls action on button click', () => {
    const action = vi.fn()

    render(<NoResultsFound {...props} action={action} />)

    expect(screen.getByTestId('img-title-description')).toBeInTheDocument()
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.description)).toBeInTheDocument()
    expect(screen.getByText(props.image)).toBeInTheDocument()

    const button = screen.getByTestId('no-results-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(props.actionLabel)

    fireEvent.click(button)

    expect(action).toHaveBeenCalledTimes(1)
  })
})
