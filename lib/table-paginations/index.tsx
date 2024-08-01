/* eslint-disable no-unused-vars */
import { TablePagination as BaseTablePagination } from '@mui/material'

type Props = Readonly<{
  count: number
  rowsPerPage: number
  page: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}>

export const TablePagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  return (
    <>
      <BaseTablePagination
        component="div"
        count={count}
        onPageChange={(_event, newPage) => {
          onPageChange(newPage)
        }}
        onRowsPerPageChange={(event) => {
          onRowsPerPageChange(Number.parseInt(event.target.value, 10))
          onPageChange(0)
        }}
        labelRowsPerPage=""
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[6, 12, 18]}
      />
    </>
  )
}
