import { Button, Stack } from '@mui/material'
import { useAuthContext } from 'providers/login-provider'

import { AuthedButtons } from 'modules/navbar/buttons/authed-buttons'

import { generateNavLinks } from 'modules/navbar/link-generator'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { LeftSideDrawer } from 'modules/navbar/left-drawer'
import { useMediaQuery } from 'react-responsive'

export const Navbar = () => {
  const MediaQuery = useMediaQuery({ query: '(max-width: 800px)' })

  const { auth, user } = useAuthContext()
  const router = useRouter()

  const handlePush = () =>
    router.push(
      `${
        user && user.role === 'teacher'
          ? '/teacher-dashboard'
          : '/student-dashboard'
      }`,
    )

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid lightgray',
        p: 1,
        pl: 3,
        pr: 3,
        width: '100%',
      }}
    >
      {!MediaQuery && (
        <Image
          className="logo-img"
          width={50}
          height={50}
          src="/vercel.svg"
          alt="logo image"
          priority
          onClick={handlePush}
        />
      )}
      {!MediaQuery && user ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          {user &&
            generateNavLinks({ role: user.role }).map((navLink) => {
              return (
                <Button
                  key={navLink.path}
                  variant={
                    router.pathname.includes(navLink.path)
                      ? 'contained'
                      : 'outlined'
                  }
                  color="primary"
                  onClick={() => router.push(navLink.path)}
                >
                  {navLink.name}
                </Button>
              )
            })}
        </Stack>
      ) : (
        <>
          {user && (
            <LeftSideDrawer links={generateNavLinks({ role: user.role })} />
          )}
        </>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        {auth.type !== 'null' && (
          <Stack direction="row" alignItems="center" spacing={2}>
            {user && <AuthedButtons />}
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
