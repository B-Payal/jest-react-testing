import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../../features/LoginForm'
import { useLogin } from '../../hooks/useLogin'
import React from 'react'
jest.mock('../../hooks/useLogin')

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders email input, password input, and submit button', () => {
    useLogin.mockReturnValue({
      handleLogin: jest.fn(),
      isLoading: false,
      error: null,
    })

    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument()
  })

  test('calls handleLogin with correct email and password on submit', async () => {
    const mockHandleLogin = jest.fn()

    useLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoading: false,
      error: null,
    })

    const user = userEvent.setup()

    render(<LoginForm />)

    await user.type(
      screen.getByLabelText(/email/i),
      'payal@test.com'
    )

    await user.type(
      screen.getByLabelText(/password/i),
      'mypassword123'
    )

    await user.click(
      screen.getByRole('button', { name: /sign in/i })
    )

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith({
        email: 'payal@test.com',
        password: 'mypassword123',
      })
    })
  })

  test('shows error message when login fails', async () => {
    useLogin.mockReturnValue({
      handleLogin: jest.fn(),
      isLoading: false,
      error: 'Invalid credentials',
    })

    render(<LoginForm />)

    await waitFor(() => {
      expect(
        screen.getByText(/invalid credentials/i)
      ).toBeInTheDocument()
    })
  })

  test('shows loading state when login is in progress', () => {
    useLogin.mockReturnValue({
      handleLogin: jest.fn(),
      isLoading: true,
      error: null,
    })

    render(<LoginForm />)

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()

    expect(
      screen.getByText(/loading/i)
    ).toBeInTheDocument()
  })

  test('does not call handleLogin when fields are empty', async () => {
    const mockHandleLogin = jest.fn()

    useLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoading: false,
      error: null,
    })

    const user = userEvent.setup()

    render(<LoginForm />)

    await user.click(
      screen.getByRole('button', { name: /sign in/i })
    )

    expect(mockHandleLogin).not.toHaveBeenCalled()
  })
})