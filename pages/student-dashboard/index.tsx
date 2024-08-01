import { Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { StudentSingleSubject } from 'modules/student-dashboard/components/card'
import { checkScopesServerSide } from 'cookies'
import { getStudentSubjects } from 'modules/student-dashboard/student.dashboard.api'
import { useAuthContext } from 'providers/login-provider'
import { useQuery } from 'react-query'

import ListAltIcon from '@mui/icons-material/ListAlt'

const StudentDashboard = () => {
  const { user } = useAuthContext()
  const $subjects = useQuery(`student.subjects`, getStudentSubjects)

  if (!user) return null

  return (
    <Container sx={{ maxWidth: 1440, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {$subjects.isLoading && (
          <Paper sx={{ height: 500 }}>
            <Skeleton variant="rectangular" height={500} sx={{ p: 2 }} />
          </Paper>
        )}
        {$subjects.data && (
          <>
            <Typography variant="h6" sx={{ my: 1 }} fontWeight="bold">
              საგნები
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={2}
              flexWrap="wrap"
            >
              {$subjects.data.subjects.map((singleSubject) => (
                <StudentSingleSubject
                  key={singleSubject.subject_id}
                  singleSubject={singleSubject}
                />
              ))}
            </Stack>
          </>
        )}
        {$subjects.data?.subjects.length === 0 && (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 4 }}
          >
            <Typography variant="h5" align="center">
              თქვენს სახელზე დარეგისტრირებული საგნების რაოდენობა არის 0
            </Typography>
            <ListAltIcon color="primary" sx={{ height: 60, width: 60 }} />
          </Stack>
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'student')

export default StudentDashboard
