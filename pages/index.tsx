import { LoginLayout } from 'layouts/login-layout'
import { useAuthContext } from 'providers/login-provider'

const Home = () => {
  const { auth } = useAuthContext()

  if (auth.type === 'null') return null

  if (auth.type === 'authenticated') {
    if (auth.role === 'teacher') window.location.href = '/teacher-dashboard'
    else window.location.href = '/student-dashboard'
  } else return <LoginLayout />
}

export default Home
