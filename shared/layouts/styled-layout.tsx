import { Box } from '@mui/system'
import { Container, IconButton, Stack, Typography } from '@mui/material'
import { NavLink } from 'lib/link'
import { ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  children: ReactNode
  title?: string
  maxHeight?: string
}

export const StyledLayout = ({ children, title, maxHeight }: Props) => {
  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        minHeight: '800px',
        p: { xl: 4, xs: 0 },
        position: 'relative',
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        sx={{
          backgroundColor: 'white',
          borderRadius: { xl: 0, xs: '30px 30px 0px 0px' },
          height: { sm: '100%', xl: '100vh' },
          marginTop: { xl: '0px', xs: '60px' },
          maxHeight: { sm: 'calc(100% - 60px)', xl: maxHeight ?? '1200px' },
        }}
        width="100%"
        position="relative"
        className="box-shadow"
      >
        <NavLink key={`mainPage`} href={`/`} exact={true}>
          <IconButton
            sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 2 }}
          >
            <CloseIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </NavLink>
        <Box
          width="25%"
          height="100%"
          sx={{
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            display: { xl: 'block', xs: 'none' },
            width: '20%',
          }}
          className="box-shadow styled-layout-left-side-image"
        />

        <Stack
          className="registration-form-container-second-box"
          sx={{ margin: 'auto' }}
          alignItems="center"
          direction="column"
          spacing={6}
          justifyContent="center"
        >
          <Typography variant="h4"> {title} </Typography>
          {children}
        </Stack>
      </Stack>
    </Container>
  )
}
