import * as React from 'react'
import { Stack, Tooltip, Typography } from '@mui/material'
import { TPoint } from 'modules/teacher-dashboard/teacher.dashboard.api'
import Paper from '@mui/material/Paper'
import ReportIcon from '@mui/icons-material/Report'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const tableCellStyles = {
  border: '1px solid #ddd',
}

const colorGenerator = (point: number) =>
  point === -2 ? 'red' : point === -1 ? 'blue' : 'black'

const symbolGenerator = (point: number) =>
  point === -2 ? '✗' : point === -1 ? '✓' : point

const SingleCell = ({ point }: { point: TPoint }) => {
  return (
    <>
      <TableCell
        key={point._id}
        component="th"
        scope="row"
        variant="body"
        sx={{
          position: 'relative',
          ...tableCellStyles,
          backgroundColor:
            point.pointType === 1
              ? '#ffecb3'
              : point.pointType === 2
              ? '#99d5cf'
              : '#ef9a9a',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.3}
        >
          <Typography
            variant="body1"
            sx={{
              color: colorGenerator(point.point),
              fontWeight: 'bold',
            }}
          >
            {symbolGenerator(point.point)}
          </Typography>
          {point.comment && (
            <Tooltip title={point.comment}>
              <ReportIcon
                sx={{
                  height: 17,
                  position: 'absolute',
                  right: 1,
                  top: 0,
                  width: 17,
                }}
                color="primary"
              />
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </>
  )
}

export const StudentPointHistoryTable = ({
  points,
  month,
}: {
  points: TPoint[]
  month: { month: string; days: number }
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {Array.from({ length: month.days }, (_, i) => i + 1).map((el) => (
                <TableCell
                  key={el}
                  sx={{
                    border: '1px solid #ddd',
                  }}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Array.from({ length: month.days }, (_, i) => i + 1).map((el) => {
                let tmp = {
                  index: 0,
                  is: false,
                }
                points.forEach((point, index) => {
                  if (!tmp.is && Number(point.date.split('-')[2]) === el)
                    tmp = {
                      index,
                      is: true,
                    }
                })
                if (tmp.is) {
                  return <SingleCell point={points[tmp.index]} />
                } else {
                  return (
                    <TableCell
                      key={month.month + el}
                      component="th"
                      scope="row"
                      variant="body"
                      sx={{
                        border: tableCellStyles.border,
                      }}
                    ></TableCell>
                  )
                }
              })}
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
