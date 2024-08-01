import {
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { StudentsTable } from 'modules/teacher-dashboard/components/students.table'
import { checkScopesServerSide } from 'cookies'
import {
  getPossibleChangePointDates,
  getStudents,
} from 'modules/teacher-dashboard/teacher.dashboard.api'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Students = ({
  classId,
  subjectId,
}: {
  classId: string
  subjectId: string
}) => {
  const router = useRouter()
  const [pointChangeDate, setPointChangeDate] = useState<string>('-1')
  const [pointType, setPointType] = useState<number>(2)

  const $students = useQuery(`class.${classId}.${subjectId}`, () =>
    getStudents({ classId, subjectId }),
  )
  const $days = useQuery(`dates`, getPossibleChangePointDates)

  return (
    <Container sx={{ maxWidth: 1440, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={3}
          sx={{ mb: 2 }}
        >
          <IconButton
            color="primary"
            sx={{ borderRadius: 1, width: 200 }}
            onClick={() => router.push(`/teacher-dashboard/${classId}`)}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              spacing={2}
            >
              <ArrowBackIcon sx={{ height: 35, width: 35 }} />
              <Typography variant="body2" sx={{ mt: 0.7 }}>
                უკან დაბრუნება
              </Typography>
            </Stack>
          </IconButton>
          {$days.data && pointChangeDate && (
            <FormControl sx={{ width: 230 }}>
              <InputLabel>თარიღი</InputLabel>
              <Select
                disabled={$days.isLoading || $days.isError}
                label="თარიღი"
                defaultValue={'-1'}
                value={pointChangeDate}
                onChange={(e) => setPointChangeDate(e.target.value)}
              >
                <MenuItem key="აირჩიეთ თარიღი" value="-1">
                  აირჩიეთ თარიღი
                </MenuItem>
                {$days.data.days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl sx={{ width: 230 }}>
            <InputLabel>ნიშნის ტიპი</InputLabel>
            <Select
              label="ნიშნის ტიპი"
              defaultValue={2}
              value={pointType}
              onChange={(e) => setPointType(Number(e.target.value))}
            >
              <MenuItem
                key="საშინაო"
                value={1}
                disabled={$students.data && $students.data.class_id <= 6}
              >
                საშინაო
              </MenuItem>
              <MenuItem key="საკლასო" value={2}>
                საკლასო
              </MenuItem>
              <MenuItem key="შემაჯამებელი" value={3}>
                შემაჯამებელი
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {$students.isLoading && (
          <Paper sx={{ height: 500 }}>
            <Skeleton variant="rectangular" height={500} sx={{ p: 2 }} />
          </Paper>
        )}
        {$students.data && (
          <StudentsTable
            students={$students.data.students}
            class_id={classId}
            subject_id={subjectId}
            pointChangeDate={pointChangeDate}
            pointType={pointType}
          />
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'teacher')

export default Students
