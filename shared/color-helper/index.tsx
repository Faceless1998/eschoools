import { Box, Stack, Typography } from '@mui/material'

const types = [
  {
    pointType: 1,
    text: 'საშინაო',
  },
  {
    pointType: 2,
    text: 'საკლასო',
  },
  {
    pointType: 3,
    text: 'შემაჯამებელი',
  },
]

export const ColorHelper = () => {
  return (
    <>
      {types.map((box) => (
        <Stack
          key={box.text}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              backgroundColor:
                box.pointType === 1
                  ? '#ffecb3'
                  : box.pointType === 2
                  ? '#99d5cf'
                  : '#ef9a9a',
              height: 15,
              width: 15,
            }}
          />
          <Typography ml={0.5} mt={0.5}>
            {box.text}
          </Typography>
        </Stack>
      ))}
    </>
  )
}
