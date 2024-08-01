import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'

import MenuIcon from '@mui/icons-material/Menu'

import { TLink, icons } from 'modules/navbar/link-generator'
import { useRouter } from 'next/router'

export const LeftSideDrawer = ({ links }: { links: TLink[] }) => {
  const router = useRouter()

  type Anchor = 'left'
  const anchor = 'left'

  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ mt: 2 }}>
        {links.map(({ name, path, icon }) => {
          const Icons = icons[icon]
          return (
            <>
              <ListItem
                button
                color="info"
                selected={path !== '/' && location.pathname.includes(path)}
                onClick={() => router.push(path)}
              >
                <ListItemIcon>
                  <Icons />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </>
          )
        })}
      </List>
    </Box>
  )

  return (
    <React.Fragment key={'left-anchor'}>
      <IconButton
        edge="start"
        color="info"
        aria-label="menu"
        sx={{ ml: '0px' }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  )
}
