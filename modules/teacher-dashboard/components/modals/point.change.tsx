import * as React from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'

import { useState } from 'react'

import {
  ReqPoint,
  THistoryStudent,
  TPoint,
  changeSinglePoint,
} from 'modules/teacher-dashboard/teacher.dashboard.api'
import { pointRange } from 'modules/teacher-dashboard/teacher.utils'
import { useMutation } from 'react-query'

type TPointChange = {
  student: THistoryStudent
  point: TPoint
  handleClose: () => void
  handleRefetch: () => void
}

export const PointChange = ({
  student,
  point,
  handleClose,
  handleRefetch,
}: TPointChange) => {
  const [changedPoint, setChangedPoint] = useState(-1)
  const [comment, setComment] = useState('')
  const [checked, setChecked] = useState(true)
  const [pointType, setPointType] = useState<number>(2)

  const $changePoint = useMutation(({ reqPoint }: { reqPoint: ReqPoint }) =>
    changeSinglePoint({
      point: reqPoint,
      pointId: point._id,
    }),
  )

  const handleChange = () =>
    $changePoint.mutate(
      {
        reqPoint: checked
          ? {
              checked,
              comment,
              point: changedPoint,
              pointType,
            }
          : {
              checked,
              point: -2,
              pointType,
            },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            point.point = checked ? changedPoint : -2
            point.checked = checked
            point.comment = comment
            point.pointType = pointType
            handleRefetch()
            handleClose()
          }
        },
      },
    )

  return (
    <>
      <DialogTitle>{point.date}</DialogTitle>
      <DialogContent sx={{ maxWidth: '100%', width: 600 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Avatar
            alt="Profile image"
            src={`${process.env.LOCAL_URL}${student.image}`}
            sx={{
              height: 45,
              objectFit: 'cover',
              width: 45,
            }}
          />
          <DialogContentText>
            {student.name} {student.surname}
          </DialogContentText>
        </Stack>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{ p: 2 }}
        >
          <Typography variant="body2">სწრებადობა: </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={0.3}
          >
            <Typography variant="body2">არა</Typography>
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="body2">კი</Typography>
          </Stack>

          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>ნიშნის ტიპი</InputLabel>
            <Select
              label="ნიშნის ტიპი"
              defaultValue={2}
              value={pointType}
              onChange={(e) => setPointType(Number(e.target.value))}
            >
              <MenuItem key="საშინაო" value={1}>
                საშინაო
              </MenuItem>
              <MenuItem key="საკლასო" value={2}>
                საკლასო
              </MenuItem>
              <MenuItem key="შემაჯამებელი" value={3}>
                შემაჯამებელი
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth disabled={!checked}>
            <InputLabel>ნიშანი</InputLabel>
            <Select
              label="ნიშანი"
              defaultValue={-1}
              value={changedPoint ?? -1}
              onChange={(e) => setChangedPoint(Number(e.target.value))}
            >
              <MenuItem value={-1}>შეფასების გარეშე</MenuItem>
              {pointRange.map((singlePoint) => (
                <MenuItem key={singlePoint} value={singlePoint}>
                  {singlePoint}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            disabled={!checked}
            fullWidth
            label="კომენტარი"
            placeholder="კომენტარი"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            fullWidth
            color="primary"
            sx={{ height: 53 }}
            onClick={handleChange}
            disabled={$changePoint.isLoading}
          >
            ნიშნის შენახვა
          </Button>
          <Button
            color="primary"
            fullWidth
            sx={{ height: 53 }}
            variant="outlined"
            disabled={$changePoint.isLoading}
            onClick={handleClose}
          >
            დახურვა
          </Button>
        </Stack>
      </DialogContent>
    </>
  )
}
