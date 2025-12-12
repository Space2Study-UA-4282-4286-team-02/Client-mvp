import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, vi } from 'vitest'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

const paginationMock = {
  page: 1,
  pageInput: 1,
  rowsPerPage: 10,
  pageCount: 10,
  itemsCount: 100,
  handleChangePage: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  handleChangePageInput: vi.fn(),
  handlePageSubmit: vi.fn()
}

describe('EnhancedTablePagination test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<EnhancedTablePagination pagination={paginationMock} />)
  })

  it('should render first page', () => {
    const pageInput = screen.getByTestId('pagination-page-input')
    const prevButton = screen.getByRole('button', { name: /previous/i })

    expect(pageInput).toHaveValue(1)
    expect(prevButton).toBeDisabled()
  })

  it('should change page from 1 to 2', () => {
    const { handleChangePage } = paginationMock

    const nextButton = screen.getByRole('button', { name: /next/i })

    fireEvent.click(nextButton)
    expect(handleChangePage).toHaveBeenCalledWith(expect.anything(), 2)
  })
})
