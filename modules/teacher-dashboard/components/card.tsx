import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import { TClass } from '../teacher.dashboard.api'
import { useRouter } from 'next/router'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

export const SingleClass = ({
  singleClass,
  type = 'teacher',
}: {
  singleClass: TClass
  type?: 'damrigebeli' | 'teacher'
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
        maxWidth: '100%',
        p: 2,
        width: 300,
      }}
      onClick={() =>
        router.push(
          `/${
            type === 'teacher' ? 'teacher-dashboard' : 'damrigebeli-dashboard'
          }/${singleClass.class_id._id}`,
        )
      }
    >
      <Stack
        direction="column"
        gap={1}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Box>
          <Typography color="white" variant="h4" sx={{ fontWeight: 'bold' }}>
            {singleClass.class_id.ID}
          </Typography>
          <Typography color="white" variant="body2">
            დამრიგებელი:
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={1}
          >
            <Typography color="white" variant="body1">
              {singleClass.class_id.damrigebeli.name}{' '}
              {singleClass.class_id.damrigebeli.surname}
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <IconButton>
            <Stack
              direction="row"
              alignItems="flex-start"
              gap={0.3}
              justifyContent="center"
            >
              <PeopleAltIcon sx={{ height: 32, width: 32 }} />
              <Typography color="white" variant="body1">
                {singleClass.quantity}
              </Typography>
            </Stack>
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}
