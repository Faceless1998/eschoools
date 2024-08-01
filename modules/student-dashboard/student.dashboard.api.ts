import { TPoint } from 'modules/teacher-dashboard/teacher.dashboard.api'
import { TResponse, request } from 'lib/api'

export type StudentSubjects = {
  subject_id: string
  subject_name: string
  teacher_name: string
  avg1: number
  avg2: number
  attendance: number
}

type TStudentSubjects = {
  subjects: StudentSubjects[]
} & TResponse

export const getStudentSubjects = async () =>
  request<TStudentSubjects>(`/student/subjects`, 'GET', 'JSON')

type THistoryPoints = {
  history: [
    {
      month: string
      points: TPoint[]
    },
  ]
  subjectName: string
  teacherName: string
} & TResponse

export const getStudentHistoryPoints = async ({
  subjectId,
  monthes,
}: {
  subjectId: string
  monthes: string[]
}) =>
  request<THistoryPoints>(`/student/history/points`, 'POST', 'JSON', {
    monthes,
    subjectId,
  })
