import * as React from 'react'
import { AddStudentPointsTable } from './students.points.add.table'
import { Avatar, Button, Stack, Switch, Typography } from '@mui/material'
import { TStudent } from '../teacher.dashboard.api'
import { sortByNameSurname } from '../teacher.service'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export const StudentsTable = ({
  students,
  class_id,
  subject_id,
  pointChangeDate,
  pointType,
}: {
  students: TStudent[]
  class_id: string
  subject_id: string
  pointChangeDate: string
  pointType: number
}) => {
  const [step, setStep] = useState(0)
  const [sortedStudents, setSortedStudents] = useState([
    ...sortByNameSurname<TStudent>({ array: students }),
  ])

  const handleStudentAttandence = (value: boolean, index: number) => {
    setSortedStudents((prev) => {
      prev[index].checked = value
      return [...prev]
    })
  }

  return (
    <>
      {step === 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>სურათი</TableCell>
                  <TableCell>სახელი</TableCell>
                  <TableCell>გვარი</TableCell>
                  <TableCell>სწრებადობა</TableCell>
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
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={0.3}
                      >
                        <Typography variant="body2">არა</Typography>
                        <Switch
                          checked={student.checked}
                          onChange={(e) =>
                            handleStudentAttandence(e.target.checked, index)
                          }
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant="body2">კი</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            color="primary"
            fullWidth
            onClick={() => setStep(1)}
            sx={{ borderRadius: 2, height: 53, mt: 2 }}
          >
            შემდეგი
          </Button>
        </>
      ) : (
        <AddStudentPointsTable
          students={sortedStudents
            .filter((student) => student.checked)
            .map((student) => {
              return { ...student, point: -1 }
            })}
          nonCheckedStudents={sortedStudents
            .filter((student) => !student.checked)
            .map((student) => {
              return {
                ...student,
                point: -2,
              }
            })}
          class_id={class_id}
          subject_id={subject_id}
          handleBack={() => setStep(0)}
          pointChangeDate={pointChangeDate}
          pointType={pointType}
        />
      )}
    </>
  )
}
