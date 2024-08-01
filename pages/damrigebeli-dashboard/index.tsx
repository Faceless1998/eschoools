import { Container, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { checkScopesServerSide } from 'cookies'
import { getDamrigebeliClasses } from 'modules/teacher-dashboard/teacher.dashboard.api'
import { useAuthContext } from 'providers/login-provider'
import { useQuery } from 'react-query'

import { SingleClass } from 'modules/teacher-dashboard/components/card'
import ListAltIcon from '@mui/icons-material/ListAlt'

const TeacherDashboard = () => {
  const { user } = useAuthContext()
  const $classes = useQuery(`sadamrigeblo.classes`, getDamrigebeliClasses)

  if (!user) return null

  return (
    <Container sx={{ maxWidth: 1440, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {$classes.isLoading && (
          <Paper sx={{ height: 500 }}>
            <Skeleton variant="rectangular" height={500} sx={{ p: 2 }} />
          </Paper>
        )}
        {$classes.data && (
          <>
            <Typography variant="h6" sx={{ my: 1 }} fontWeight="bold">
              სადამრიგებლო კლასები
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={2}
              flexWrap="wrap"
            >
              {$classes.data.classes.map((singleClass) => (
                <SingleClass
                  key={singleClass.class_id._id}
                  singleClass={singleClass}
                  type="damrigebeli"
                />
              ))}
            </Stack>
          </>
        )}
        {$classes.data?.classes.length === 0 && (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ p: 4 }}
          >
            <Typography variant="h5" align="center">
              თქვენს სახელზე დარეგისტრირებული კლასების რაოდენობა არის 0
            </Typography>
            <ListAltIcon color="primary" sx={{ height: 60, width: 60 }} />
          </Stack>
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'teacher')

export default TeacherDashboard
