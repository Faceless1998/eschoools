import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { TSubject } from '../subjects.api'
import { useRouter } from 'next/router'
import HistoryIcon from '@mui/icons-material/History'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'

import { queryClient } from 'pages/_app'

export const SingleSubject = ({
  singleSubject,
  classId,
  type,
}: {
  singleSubject: TSubject
  type: 'damrigebeli' | 'teacher'
  classId: string
}) => {
  const router = useRouter()
  const isDamrigebeli = type === 'damrigebeli' ? true : false

  const handlePush = () => {
    router.push(
      `/${
        isDamrigebeli ? '/damrigebeli-dashboard' : 'teacher-dashboard'
      }/${classId}/${singleSubject.subject_id._id}/${
        isDamrigebeli ? 'history' : ''
      }`,
    )
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ position: 'relative' }}
    >
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
        onClick={handlePush}
      >
        <Stack
          direction="column"
          gap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography color="white" variant="h5" sx={{ fontWeight: 'bold' }}>
              {singleSubject.subject_id.subject_name}
            </Typography>
          </Box>
          {isDamrigebeli && (
            <Typography
              color="white"
              align="center"
              variant="body1"
              sx={{ mt: 0.2 }}
            >
              მასწავლებელი: {singleSubject.teacher_id.name}{' '}
              {singleSubject.teacher_id.surname}
            </Typography>
          )}
        </Stack>
      </Paper>
      {!isDamrigebeli && (
        <Button
          onClick={() => {
            queryClient.clear()
            router.push(
              `${
                isDamrigebeli ? '/damrigebeli-dashboard' : '/teacher-dashboard'
              }/${classId}/${singleSubject.subject_id._id}/history`,
            )
          }}
          fullWidth
          color="primary"
          sx={{
            borderRadius: '0px !important',
            bottom: 0,
            position: 'absolute',
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            gap={1}
          >
            <Typography variant="body2">ისტორია: </Typography>
            <HistoryIcon sx={{ height: 32, width: 32 }} />
          </Stack>
        </Button>
      )}
      <Button
        onClick={() => {
          queryClient.clear()
          router.push(
            `${
              isDamrigebeli ? '/damrigebeli-dashboard' : '/teacher-dashboard'
            }/${classId}/${singleSubject.subject_id._id}/statistics`,
          )
        }}
        fullWidth
        color="primary"
        sx={{
          borderRadius: '0px !important',
          bottom: isDamrigebeli ? 0 : 50,
          position: 'absolute',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={1}
        >
          <Typography variant="body2">სტატისტიკა: </Typography>
          <LeaderboardIcon sx={{ height: 32, width: 32 }} />
        </Stack>
      </Button>
    </Stack>
  )
}
