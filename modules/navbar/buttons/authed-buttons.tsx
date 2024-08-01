import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useAuthContext } from 'providers/login-provider'
import { useRouter } from 'next/router'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

import { ImageUploader } from 'modules/profile/components/image-uploader'

const imageStyles = {
  '&:hover': {
    backgroundColor: 'transparent',
  },
  backgroundColor: 'transparent',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  borderRadius: '50%',
  cursor: 'pointer',
  height: 150,
  margin: 'auto',
  marginBottom: 2,
  width: 150,
}

export const AuthedButtons = () => {
  const { t, removeToken, auth, user } = useAuthContext()
  const router = useRouter()
  const [fileUrl, setFileUrl] = useState<string>(
    user !== null ? user.image : '/uploads/default/default.png',
  )
  const [navImg, setNavImg] = useState<string>(fileUrl)

  const renderImages = useCallback(() => {
    setNavImg(fileUrl)
  }, [fileUrl, setNavImg])

  useEffect(() => {
    renderImages()
  }, [renderImages])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    removeToken()
    handleClose()
    router.push('/')
  }

  const handleChangePassword = () => {
    handleClose()
    router.push('/change-password')
  }

  return (
    <>
      <Stack direction="column">
        <Typography sx={{ fontSize: 12 }}>
          {auth?.type !== 'null' &&
          auth?.type !== 'unauthenticated' &&
          auth.role === 'teacher'
            ? 'მასწავლებელი'
            : 'მოსწავლე'}{' '}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          {user?.name} {user?.surname}
        </Typography>
      </Stack>
      <Button
        sx={{
          '&:hover': { backgroundColor: 'transparent' },
          backgroundColor: 'transparent',
          height: 40,
          width: 40,
        }}
        onClick={handleClick}
      >
        <Avatar
          alt="Profile image"
          src={`${process.env.LOCAL_URL}${navImg}`}
          sx={{
            height: 45,
            objectFit: 'cover',
            width: 45,
          }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 250,
          },
        }}
        sx={{
          top: 18,
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <ImageUploader
            url="/profile/image/upload"
            fileName="profile"
            accept={['image/png', 'image/jpeg', 'image/jpg']}
            onUpdateFile={setFileUrl}
            sx={{
              backgroundImage: `url(${process.env.LOCAL_URL}${fileUrl})`,
              ...imageStyles,
            }}
          />
        </MenuItem>
        {user && user.role !== 'student' && (
          <MenuItem onClick={handleChangePassword}>
            <Stack direction="row" spacing={1} sx={{ p: 1 }}>
              <VerifiedUserIcon />
              <Typography>უსაფრთხოება</Typography>
            </Stack>
          </MenuItem>
        )}

        <MenuItem color="info" onClick={handleLogout}>
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            <ExitToAppIcon />
            <Typography>{t.main.exit}</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  )
}
