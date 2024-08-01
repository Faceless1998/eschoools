import { Box, Paper, Stack, Typography } from '@mui/material'
import { StudentSubjects } from '../student.dashboard.api'
import { useRouter } from 'next/router'

export const StudentSingleSubject = ({
  singleSubject,
}: {
  singleSubject: StudentSubjects
}) => {
  const router = useRouter()

  return (
    <Paper
      sx={{
        '&:hover': {
          background: '#6f74dd',
        },
        background: '#757de8',
        cursor: 'pointer',
        height: 200,
        maxWidth: '100%',
        p: 2,
        width: 360,
      }}
      onClick={() =>
        router.push(`/student-dashboard/${singleSubject.subject_id}`)
      }
    >
      <Stack
        direction="column"
        gap={1}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Box>
          <Typography color="white" variant="body2">
            საგანი: {singleSubject.subject_name}
          </Typography>
          <Typography color="white" variant="body2">
            მასწ: {singleSubject.teacher_name}
          </Typography>
        </Box>

        <Stack
          direction="column"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={0.2}
          justifyContent="center"
        >
          <Typography color="white" variant="body1">
            საშ. I სემესტრი: {singleSubject.avg1}
          </Typography>
          <Typography color="white" variant="body1">
            საშ. II სემესტრი: {singleSubject.avg2}
          </Typography>
          <Typography color="white" variant="body1">
            საშ. დასწრება: {singleSubject.attendance} %
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
