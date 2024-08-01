import { ReactElement, Ref, forwardRef } from 'react'
import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
