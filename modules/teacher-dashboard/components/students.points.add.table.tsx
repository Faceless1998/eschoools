import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { TStudent, addPoints } from '../teacher.dashboard.api'
import { pointRange } from '../teacher.utils'
import { queryClient } from 'pages/_app'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

export const AddStudentPointsTable = ({
  students,
  class_id,
  nonCheckedStudents,
  subject_id,
  pointChangeDate,
  handleBack,
  pointType,
}: {
  students: TStudent[]
  nonCheckedStudents: TStudent[]
  class_id: string
  pointChangeDate: string | null
  subject_id: string
  handleBack: () => void
  pointType: number
}) => {
  const router = useRouter()
  const [sortedStudents, setSortedStudents] = useState([...students])

  const $addPoints = useMutation(
    ({
      students,
      nonCheckedStudents,
    }: {
      students: TStudent[]
      nonCheckedStudents: TStudent[]
    }) =>
      addPoints({
        class_id,
        nonCheckedStudents,
        pointChangeDate,
        pointType,
        students,
        subject_id,
      }),
  )

  const handlePointChange = (value: string | number, index: number) => {
    setSortedStudents((prev) => {
      prev[index].point = Number.parseInt(value.toString(), 10)
      return [...prev]
    })
  }

  const handleCommentChange = (value: string, index: number) => {
    setSortedStudents((prev) => {
      prev[index].comment = value.trim()
      return [...prev]
    })
  }

  const handleSaveTable = () => {
    if (pointChangeDate === '-1') {
      toast.error('აირჩიეთ თარიღი')
    } else {
      $addPoints.mutate(
        { nonCheckedStudents, students: sortedStudents },
        {
          onSuccess: (data) => {
            queryClient.clear()
            data.success && router.push('/teacher-dashboard')
          },
        },
      )
    }
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>სურათი</TableCell>
              <TableCell>სახელი</TableCell>
              <TableCell>გვარი</TableCell>
              <TableCell>ნიშანი</TableCell>
              <TableCell>კომენტარი</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.map((student, index) => (
              <TableRow
                key={student.student_id._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    alt="Profile image"
                    src={`${process.env.LOCAL_URL}${student.student_id.image}`}
                    sx={{
                      height: 45,
                      objectFit: 'cover',
                      width: 45,
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {student.student_id.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {student.student_id.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  <FormControl sx={{ width: 230 }}>
                    <InputLabel>ნიშანი</InputLabel>
                    <Select
                      label="ნიშანი"
                      defaultValue={-1}
                      value={student.point ?? -1}
                      onChange={(e) => handlePointChange(e.target.value, index)}
                    >
                      <MenuItem value={-1}>შეფასების გარეშე</MenuItem>
                      {pointRange.map((point) => (
                        <MenuItem key={point} value={point}>
                          {point}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    label="კომენტარი"
                    placeholder="Placeholder"
                    multiline
                    value={student.comment}
                    onChange={(e) => handleCommentChange(e.target.value, index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        color="primary"
        fullWidth
        onClick={handleSaveTable}
        disabled={$addPoints.isLoading}
        sx={{ borderRadius: 2, height: 53, mt: 2 }}
      >
        ნიშნების შენახვა
      </Button>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={handleBack}
        disabled={$addPoints.isLoading}
        sx={{ borderRadius: 2, height: 53, mt: 2 }}
      >
        უკან
      </Button>
    </>
  )
}
