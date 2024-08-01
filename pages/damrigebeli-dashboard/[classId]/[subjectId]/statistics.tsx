import * as React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { GetServerSidePropsContext } from 'next'
import { checkScopesServerSide } from 'cookies'

import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

import { CSVLink } from 'react-csv'
import { getStatistics } from 'modules/teacher-dashboard/teacher.dashboard.api'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

interface TStatisticStudent {
  name: string
  surname: string
  avg1: number
  avg2: number
  attendance: number
}

const Statistics = ({
  classId,
  subjectId,
}: {
  classId: string
  subjectId: string
}) => {
  const router = useRouter()

  const $statistics = useQuery(
    `damrigebeli.statistics.${classId}.${subjectId}`,
    () => getStatistics({ classId, subjectId }),
  )

  const [sortConfig] = React.useState({
    direction: 'asc', // Default sorting direction
    key: 'surname', // Default sorting key
  })

  const headers = [
    { key: 'name', label: 'სახელი' },
    { key: 'surname', label: 'გვარი' },
    { key: 'avg1', label: '1 სემ. საშ' },
    { key: 'avg2', label: '2 სემ. საშ' },
    { key: 'attendance', label: 'სწრებადობა' },
  ]

  const sortedData = React.useMemo(() => {
    if (!$statistics.data) return []

    const dataCopy = [...$statistics.data.statistics]

    const allowedProperties: (keyof TStatisticStudent)[] = [
      'name',
      'surname',
      'avg1',
      'avg2',
      'attendance',
    ]

    return dataCopy.sort((a, b) => {
      const key = sortConfig.key as keyof TStatisticStudent

      if (key && allowedProperties.includes(key)) {
        const aValue = a[key]
        const bValue = b[key]

        if (aValue !== null && bValue !== null) {
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue)
          } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc'
              ? aValue - bValue
              : bValue - aValue
          }
        }
      }

      return 0
    })
  }, [$statistics.data, sortConfig])
  return (
    <Container sx={{ maxWidth: 1440, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
          sx={{ mb: 2 }}
        >
          <IconButton
            color="primary"
            sx={{ borderRadius: 1, width: 200 }}
            onClick={() => router.push(`/damrigebeli-dashboard/${classId}`)}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <ArrowBackIcon sx={{ height: 35, width: 35 }} />
              <Typography variant="body2" sx={{ mt: 0.7 }}>
                უკან დაბრუნება
              </Typography>
            </Stack>
          </IconButton>
          {$statistics.data && (
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
              gap={1}
            >
              <Typography variant="h6" fontWeight="bold">
                საგანი: {$statistics.data.subjectName}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                მასწავლებელი: {$statistics.data.teacherName}
              </Typography>
            </Stack>
          )}
        </Stack>
        {$statistics.isLoading && (
          <Paper sx={{ height: 500, my: 2 }}>
            <Skeleton variant="rectangular" height={500} sx={{ p: 2 }} />
          </Paper>
        )}
        {$statistics.data && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    მოსწავლე{' '}
                    {sortConfig.key === 'surname' && (
                      <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                    )}{' '}
                  </TableCell>
                  <TableCell>I სემ. საშ. ქულა</TableCell>
                  <TableCell>II სემ. საშ. ქულა</TableCell>
                  <TableCell>წლიური საშ. ქულა</TableCell>
                  <TableCell>სწრებადობა</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((student) => (
                  <TableRow
                    key={student._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
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
                          {student.surname} {student.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {Math.round(student.avg1)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {Math.round(student.avg2)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {!student.avg1
                        ? Math.round(Math.round(student.avg2))
                        : Math.round(
                            Math.round(student.avg1) + Math.round(student.avg2),
                          ) / 2}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.attendance.toFixed(1)} %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {$statistics.data && (
          <Button
            color="primary"
            variant="contained"
            sx={{ height: 53, my: 1.5 }}
          >
            <CSVLink
              data={$statistics.data.statistics.map((student) => ({
                ...student,
                attendance: student.attendance.toFixed(2),
              }))}
              filename={`${$statistics.data.subjectName}-statistics.csv`}
              headers={headers}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              გადმოწერა EXCEL - ში
            </CSVLink>
          </Button>
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'teacher')

export default Statistics
