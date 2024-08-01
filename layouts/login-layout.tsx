import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material'
import { Login } from 'modules/login'
import { useState } from 'react'

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import SchoolIcon from '@mui/icons-material/School'
export const LoginLayout = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [role, setRole] = useState<'teacher' | 'student' | null>(null)

  return (
    <Box
      sx={{
        backgroundColor: '#b882ef',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1,
      }}
    >
      <Container>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff' }}>
            ელექტრონული ჟურნალი
          </Typography>
          <Stack
            direction={{ xl: 'row', xs: 'column' }}
            flexWrap="wrap"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              sx={{ height: 200, maxWidth: '100%', width: 320 }}
              onClick={() => {
                setRole('teacher')
                setShowLogin(true)
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
                justifyContent="center"
              >
                <Typography variant="h6">მასწავლებელი</Typography>
                <SchoolIcon sx={{ height: 50, width: 50 }} />
              </Stack>
            </Button>
            <Button
              sx={{ height: 200, maxWidth: '100%', width: 320 }}
              onClick={() => {
                setRole('student')
                setShowLogin(true)
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Typography variant="h6">მოსწავლე</Typography>
                <EmojiPeopleIcon sx={{ height: 50, width: 50 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>
        {role && (
          <Dialog
            open={showLogin}
            onClose={() => setShowLogin(false)}
            keepMounted
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <DialogContent>
              <Login type={role} setShowLogin={setShowLogin} />
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </Box>
  )
}
