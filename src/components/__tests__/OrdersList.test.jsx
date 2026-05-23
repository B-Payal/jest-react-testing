import { render, screen } from '@testing-library/react'
import OrdersList from '../../features/OrdersList'
import { useOrders } from '../../hooks/useOrders'
import React from 'react'

jest.mock('../../hooks/useOrders')

describe('OrdersList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all order names when orders are returned', () => {
    useOrders.mockReturnValue({
      orders: [
        {
          id: 1,
          name: 'MacBook Pro',
          date: '2026-05-23',
          status: 'Delivered',
        },
        {
          id: 2,
          name: 'iPhone 17',
          date: '2026-05-24',
          status: 'In Transit',
        },
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(<OrdersList />)

    expect(
      screen.getByText('MacBook Pro')
    ).toBeInTheDocument()

    expect(
      screen.getByText('iPhone 17')
    ).toBeInTheDocument()
  })

  test('shows empty state when orders array is empty', () => {
    useOrders.mockReturnValue({
      orders: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(<OrdersList />)

    expect(
      screen.getByText(/no orders yet/i)
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('listitem')
    ).not.toBeInTheDocument()
  })

  test('shows error message when orders loading fails', () => {
    useOrders.mockReturnValue({
      orders: [],
      isLoading: false,
      error: 'Failed to fetch',
      refetch: jest.fn(),
    })

    render(<OrdersList />)

    expect(
      screen.getByText(
        /something went wrong loading your orders/i
      )
    ).toBeInTheDocument()
  })
})