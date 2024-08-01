import { Home } from '@mui/icons-material'
import { TRole } from 'providers/login-provider'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import ContactsIcon from '@mui/icons-material/Contacts'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import LoginIcon from '@mui/icons-material/Login'
import StarsIcon from '@mui/icons-material/Stars'

export const icons = {
  AllInclusiveIcon,
  AssessmentIcon,
  BookmarksIcon,
  ContactsIcon,
  CreditCardIcon,
  DesignServicesIcon,
  FreeBreakfastIcon,
  Home,
  ImportContactsIcon,
  LoginIcon,
  StarsIcon,
}
export type TLink = {
  name: string
  path: string
  exact: boolean
  icon: keyof typeof icons
}

const bothRoutes: TLink[] = [
  {
    exact: true,
    icon: 'Home',
    name: 'home',
    path: '/',
  },
]

export const studentLinks: TLink[] = [
  {
    exact: true,
    icon: 'Home',
    name: 'საგნები',
    path: '/student-dashboard',
  },
]

export const teacherLinks: TLink[] = [
  {
    exact: true,
    icon: 'Home',
    name: 'კლასები',
    path: '/teacher-dashboard',
  },
  {
    exact: true,
    icon: 'BookmarksIcon',
    name: 'სადამრიგებლო',
    path: '/damrigebeli-dashboard',
  },
]

export const navLinks: TLink[] = [...bothRoutes]

export const generateNavLinks = ({ role }: { role: TRole }) => {
  return role === 'teacher' ? teacherLinks : studentLinks
}
