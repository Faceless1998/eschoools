import {
  Container,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { SingleSubject } from 'modules/subjects/components/card'
import { checkScopesServerSide } from 'cookies'
import { getSadamrigebloSubjects } from 'modules/subjects/subjects.api'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const SadamrigebloSubjects = ({ classId }: { classId: string }) => {
  const router = useRouter()
  const $subjects = useQuery(`sadamrigeblo.subjects.${classId}`, () =>
    getSadamrigebloSubjects({ classId }),
  )

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
                onClick={() => router.push(`/damrigebeli-dashboard`)}
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
              {$subjects.data && (
                <Typography variant="h6" fontWeight="bold">
                  კლასი: {$subjects.data.ID}
                </Typography>
              )}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={2}
              flexWrap="wrap"
            >
              {$subjects.data.subjects.map((singleSubject) => {
                return (
                  <SingleSubject
                    key={singleSubject.subject_id._id}
                    singleSubject={singleSubject}
                    classId={$subjects.data.CLASS_ID}
                    type="damrigebeli"
                  />
                )
              })}
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkScopesServerSide(ctx, 'teacher')

export default SadamrigebloSubjects
