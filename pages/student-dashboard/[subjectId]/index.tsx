import {
  Button,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import {
  TMonthRange,
  monthToDateRange,
  monthesRange,
} from 'modules/teacher-dashboard/teacher.utils'
import { checkScopesServerSide } from 'cookies'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ColorHelper } from 'shared/color-helper'
import { StudentPointHistoryTable } from 'modules/student-dashboard/components/history.table'
import { getStudentHistoryPoints } from 'modules/student-dashboard/student.dashboard.api'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

const dateGenerator = () =>
  new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .split(' ')[0]
    .split('-')[1]

const monthGenerator = (historyMonth: string) => {
  let exactMonth = { days: 31, month: '' }
  monthesRange.forEach((month) => {
    if (month.monthNumber === historyMonth) exactMonth = month
  })
  return exactMonth
}

const History = ({ subjectId }: { subjectId: string }) => {
  const router = useRouter()
  const [monthes, setMonthes] = useState([dateGenerator()])
  const $points = useQuery(
    `history.student.points.${subjectId}.${monthes}`,
    () => getStudentHistoryPoints({ monthes, subjectId }),
  )

  const handleChooseMonth = ({ month }: { month: TMonthRange }) => {
    if (monthes.includes(monthToDateRange[`${month.monthNumber}`])) {
      setMonthes((prev) => [
        ...prev.filter(
          (choosedMonth) =>
            choosedMonth !== monthToDateRange[`${month.monthNumber}`],
        ),
      ])
    } else {
      setMonthes((prev) => [...prev, monthToDateRange[`${month.monthNumber}`]])
    }
  }

  return (
    <Container sx={{ maxWidth: 1440, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{ mb: 2 }}
        >
          <IconButton
            color="primary"
            sx={{ borderRadius: 1, width: 200 }}
            onClick={() => router.push(`/student-dashboard`)}
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
          <ColorHelper />
          {$points.data && (
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
              gap={1}
            >
              <Typography variant="h6" fontWeight="bold">
                საგანი: {$points.data.subjectName}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                მასწავლებელი: {$points.data.teacherName}
              </Typography>
            </Stack>
          )}
        </Stack>
        {$points.isLoading && (
          <>
            {monthes.map((month) => (
              <Paper key={month} sx={{ height: 200, my: 2 }}>
                <Skeleton variant="rectangular" height={200} sx={{ p: 2 }} />
              </Paper>
            ))}
          </>
        )}
        {$points.data && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
              sx={{ my: 1 }}
            >
              {monthesRange.map((month) => (
                <Button
                  key={month.month}
                  color="primary"
                  variant={`${
                    monthes.includes(monthToDateRange[`${month.monthNumber}`])
                      ? 'contained'
                      : 'outlined'
                  }`}
                  sx={{ height: 45, width: 150 }}
                  onClick={() => handleChooseMonth({ month })}
                >
                  {month.month}
                </Button>
              ))}
            </Stack>
            {$points.data.history.map((history) => (
              <>
                <Paper sx={{ backgroundColor: '#2e0b80', mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#fff', p: 1 }}
                    align="center"
                  >
                    {monthGenerator(history.month).month}
                  </Typography>
                </Paper>
                <StudentPointHistoryTable
                  key={history.month}
                  points={history.points}
                  month={monthGenerator(history.month)}
                />
              </>
            ))}
          </>
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'student')

export default History
