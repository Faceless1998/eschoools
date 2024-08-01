import * as React from 'react'
import { Avatar, Button, Stack, Tooltip, Typography } from '@mui/material'
import { CSVLink } from 'react-csv'
import { PointChange } from './modals/point.change'
import { THistoryStudent, TPoint } from '../teacher.dashboard.api'
import {
  generateCSV,
  generateHeaders,
  sortByNameSurnameHistoryPoints,
} from '../teacher.service'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import ReportIcon from '@mui/icons-material/Report'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useRouter } from 'next/router'

const tableCellStyles = {
  '&:hover': {
    cursor: 'pointer',
  },
  border: '1px solid #ddd',
}

const colorGenerator = (point: number) =>
  point === -2 ? 'red' : point === -1 ? 'blue' : 'black'

const symbolGenerator = (point: number) =>
  point === -2 ? '✗' : point === -1 ? '✓' : point

const SingleCell = ({
  point,
  student,
  handleRefetch,
}: {
  point: TPoint
  student: THistoryStudent
  handleRefetch: () => void
}) => {
  const router = useRouter()
  const [changePoint, setChangePoint] = React.useState(false)

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
        onClick={() => {
          !router.pathname.includes('/damrigebeli-dashboard') &&
            setChangePoint(true)
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
      <Dialog
        open={changePoint}
        onClose={() => setChangePoint(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PointChange
          student={student}
          point={point}
          handleClose={() => setChangePoint(false)}
          handleRefetch={handleRefetch}
        />
      </Dialog>
    </>
  )
}

export const HistoryTable = ({
  students,
  month,
  handleRefetch,
}: {
  students: THistoryStudent[]
  month: { month: string; days: number }
  handleRefetch: () => void
}) => {
  const [sortedStudents] = React.useState([
    ...sortByNameSurnameHistoryPoints<THistoryStudent>({ array: students }),
  ])

  const headers = [
    ...[
      { key: 'name', label: 'სახელი' },
      { key: 'surname', label: 'გვარი' },
    ],
    ...generateHeaders(sortedStudents),
  ]
  const CSV_DATA = generateCSV(sortedStudents)

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>სახელი გვარი</TableCell>
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
            {sortedStudents.map((student) => (
              <TableRow
                key={student._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" variant="body">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Avatar
                      alt="Profile image"
                      src={`${process.env.LOCAL_URL}${student.image}`}
                      sx={{
                        height: 25,
                        objectFit: 'cover',
                        width: 25,
                      }}
                    />
                    <Typography>
                      {' '}
                      {student.name} {student.surname}
                    </Typography>
                  </Stack>
                </TableCell>
                {Array.from({ length: month.days }, (_, i) => i + 1).map(
                  (el) => {
                    let tmp = {
                      index: 0,
                      is: false,
                    }
                    student.points.forEach((point, index) => {
                      if (!tmp.is && Number(point.date.split('-')[2]) === el)
                        tmp = {
                          index,
                          is: true,
                        }
                    })
                    if (tmp.is) {
                      return (
                        <SingleCell
                          point={student.points[tmp.index]}
                          student={student}
                          handleRefetch={handleRefetch}
                        />
                      )
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
                  },
                )}
              </TableRow>
            ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button color="primary" variant="contained" sx={{ height: 53, my: 1.5 }}>
        <CSVLink
          data={CSV_DATA}
          filename={`${month.month}.${new Date().getFullYear()}.csv`}
          headers={headers}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          გადმოწერა EXCEL - ში
        </CSVLink>
      </Button>
    </>
  )
}
