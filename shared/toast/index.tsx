import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

export const showToast = ({
  text,
  isError,
  autoClose,
}: {
  text: string
  isError: boolean
  autoClose: number
}) =>
  isError
    ? toast.success(text, { autoClose })
    : toast.error(text, { autoClose })
