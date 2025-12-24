import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, vi } from 'vitest'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

const createPaginationMock = () => ({
  page: 1,
  pageInput: 1,
  rowsPerPage: 10,
  pageCount: 10,
  itemsCount: 100,
  handleChangePage: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  handleChangePageInput: vi.fn(),
  handlePageSubmit: vi.fn()
})

describe('EnhancedTablePagination test', () => {
  let paginationMock

  beforeEach(() => {
    vi.clearAllMocks()
    paginationMock = createPaginationMock()
    render(<EnhancedTablePagination pagination={paginationMock} />)
  })

  it('should render first page', () => {
    const pageInput = screen.getByTestId('pagination-page-input')
    const prevButton = screen.getByRole('button', { name: /previous/i })

    expect(pageInput).toHaveValue(1)
    expect(prevButton).toBeDisabled()
  })

  it('should change page from 1 to 2', async () => {
    const { handleChangePage } = paginationMock

    const nextButton = screen.getByRole('button', { name: /next/i })

    await userEvent.click(nextButton)

    expect(handleChangePage).toHaveBeenCalledWith(expect.anything(), 2)
  })
})
