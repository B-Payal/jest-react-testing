import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorMessage from '../ErrorMessage'
import React from 'react'

describe('ErrorMessage', () => {
  // Test 1: Renders the message prop text
  test('renders the message prop text', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  // Test 2: Renders retry button and calls onRetry when clicked
  test('renders "Try again" button and calls onRetry when clicked', async () => {
    const mockRetry = jest.fn()
    const user = userEvent.setup()

    render(
      <ErrorMessage
        message="Failed to load"
        onRetry={mockRetry}
      />
    )

    const retryButton = screen.getByRole('button', {
      name: /try again/i,
    })

    expect(retryButton).toBeInTheDocument()

    await user.click(retryButton)

    expect(mockRetry).toHaveBeenCalledTimes(1)
  })

  // Test 3: Does not render retry button when onRetry is not provided
  test('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error occurred" />)

    const retryButton = screen.queryByRole('button', {
      name: /try again/i,
    })

    expect(retryButton).not.toBeInTheDocument()
  })
})