/* eslint-disable @next/next/no-img-element */
import { Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
  imgURL: string
  title: string
  description: string
  borderColor: string
  bgColor: string
  button: JSX.Element
}

export const Card = ({
  imgURL,
  title,
  description,
  borderColor,
  bgColor,
  button,
}: Props) => {
  return (
    <Stack
      className="card-main-container"
      sx={{ backgroundColor: `${bgColor}`, border: `solid 1px ${borderColor}` }}
      direction="column"
      spacing="auto"
    >
      <img src={imgURL} alt="Card" />
      <Typography variant="h6">{title}</Typography>
      <Typography className="card-description" variant="body1">
        {description}
      </Typography>
      {button}
    </Stack>
  )
}
