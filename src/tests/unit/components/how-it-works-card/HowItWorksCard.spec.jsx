import { screen, render } from '@testing-library/react'

import HowItWorksCard from '~/components/how-it-works-card/HowItWorksCard'

describe('HowItWorksCard component', () => {
  const defaultProps = {
    title: 'Test Title',
    cardWidth: 300
  }

  it('should render title', () => {
    render(<HowItWorksCard {...defaultProps} />)

    const title = screen.getByText(defaultProps.title)

    expect(title).toBeInTheDocument()
  })

  it('should render description when provided', () => {
    const description = 'Test Description'
    render(<HowItWorksCard {...defaultProps} description={description} />)

    const descriptionElement = screen.getByText(description)

    expect(descriptionElement).toBeInTheDocument()
  })

  it('should render image with alt text when provided', () => {
    const imageSrc = '/test-image.png'
    const altText = 'Test Image Alt'
    render(<HowItWorksCard {...defaultProps} alt={altText} image={imageSrc} />)

    const image = screen.getByAltText(altText)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', imageSrc)
  })

  it('should apply cardWidth to maxWidth style', () => {
    const cardWidth = 400
    const { container } = render(
      <HowItWorksCard {...defaultProps} cardWidth={cardWidth} />
    )

    const title = screen.getByText(defaultProps.title)
    let wrapper = title.parentElement
    while (wrapper && wrapper.parentElement !== container) {
      wrapper = wrapper.parentElement
    }

    expect(wrapper).toHaveStyle({ maxWidth: `${cardWidth}px` })
  })
})
