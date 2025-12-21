import { screen, render } from '@testing-library/react'

import HowItWorksStepBlock from '~/components/howItWorksStepBlock/HowItWorksStepBlock'

describe('HowItWorksStepBlock component', () => {
  const defaultProps = {
    title: 'Test Title',
    cardWidth: 300
  }

  it('should render title', () => {
    render(<HowItWorksStepBlock {...defaultProps} />)

    const title = screen.getByText(defaultProps.title)

    expect(title).toBeInTheDocument()
  })

  it('should render description when provided', () => {
    const description = 'Test Description'
    render(<HowItWorksStepBlock {...defaultProps} description={description} />)

    const descriptionElement = screen.getByText(description)

    expect(descriptionElement).toBeInTheDocument()
  })

  it('should render image with alt text when provided', () => {
    const imageSrc = '/test-image.png'
    const altText = 'Test Image Alt'
    render(
      <HowItWorksStepBlock {...defaultProps} alt={altText} image={imageSrc} />
    )

    const image = screen.getByAltText(altText)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', imageSrc)
  })

  it('should apply cardWidth to maxWidth style', () => {
    const cardWidth = 400
    const { container } = render(
      <HowItWorksStepBlock {...defaultProps} cardWidth={cardWidth} />
    )

    const wrapper = container.firstChild

    expect(wrapper).toHaveStyle({ maxWidth: `${cardWidth}px` })
  })
})
