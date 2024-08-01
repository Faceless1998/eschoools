import { TResponse, request } from 'lib/api'

type TDamrigebeli = {
  name: string
  surname: string
}

export type TClass = {
  _id: string
  class_id: {
    _id: string
    ID: string
    damrigebeli: TDamrigebeli
  }
  quantity: number
}
export type TClasses = {
  classes: TClass[]
} & TResponse

export const getTeacherClasses = async () =>
  request<TClasses>(`/teacher/classes`, 'GET', 'JSON')

export const getDamrigebeliClasses = async () =>
  request<TClasses>(`/teacher/sadamrigeblo/classes`, 'GET', 'JSON')

export type TStudent = {
  student_id: {
    _id: string
    name: string
    surname: string
    image: string
  }
  checked: boolean //default archevis
  point: number | null
  comment: string
  _id: string
}

type TStudents = {
  students: TStudent[]
  class_id: number
} & TResponse

export const getStudents = async ({
  classId,
  subjectId,
}: {
  classId: string
  subjectId: string
}) =>
  request<TStudents>(`/teacher/students/${classId}/${subjectId}`, 'GET', 'JSON')

export const addPoints = async ({
  students,
  class_id,
  subject_id,
  nonCheckedStudents,
  pointChangeDate,
  pointType,
}: {
  students: TStudent[]
  nonCheckedStudents: TStudent[]
  class_id: string
  subject_id: string
  pointChangeDate: string | null
  pointType: number
}) =>
  request(`/teacher/students/points/add`, 'POST', 'JSON', {
    class_id,
    pointChangeDate,
    pointType,
    points: [...students, ...nonCheckedStudents],
    subject_id,
  })

export type TPoint = {
  checked: boolean
  class_id: string
  comment: string
  date: string
  point: number
  pointType: number
  student_id: string
  subject_id: { _id: string; subject_name: string }
  subject_name: string
  _id: string
  teacher_id: { name: string; surname: string }
  name: string
  surname: string
}

export type THistoryStudent = {
  ID: string
  class_id: string
  image: string
  name: string
  password: string
  points: TPoint[]
  role: string
  surname: string
  _id: string
}

type THistoryPoints = {
  history: [
    {
      month: string
      students: THistoryStudent[]
    },
  ]
  subjectName: string
} & TResponse

export const getHistoryPoints = async ({
  classId,
  subjectId,
  monthes,
}: {
  classId: string
  subjectId: string
  monthes: string[]
}) =>
  request<THistoryPoints>(`/teacher/history/points`, 'POST', 'JSON', {
    classId,
    monthes,
    subjectId,
  })

export type ReqPoint = {
  comment?: string
  checked: boolean
  point: number
  pointType: number
}

type PointInput = {
  pointId: string
  point: ReqPoint
}

export const changeSinglePoint = async ({ pointId, point }: PointInput) =>
  request(`/teacher/single-point/change`, 'POST', 'JSON', {
    point,
    pointId,
  })

type StatisticInput = {
  classId: string
  subjectId: string
}

export type TStatisticStudent = {
  name: string
  surname: string
  image: string
  _id: string
  avg1: number
  avg2: number
  attendance: number
}

type TStatistic = {
  statistics: TStatisticStudent[]
  subjectName: string
  teacherName: string
} & TResponse

export const getStatistics = async ({ classId, subjectId }: StatisticInput) =>
  request<TStatistic>(
    `/teacher/statistic/${classId}/${subjectId}`,
    'GET',
    'JSON',
  )

type TChangeDates = {
  days: string[]
} & TResponse

export const getPossibleChangePointDates = async () =>
  request<TChangeDates>(`/dates`, 'GET', 'JSON')
