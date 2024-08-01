import * as yup from 'yup'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { SetStateAction } from 'react-router-use-location-state'
import { useAuthContext } from 'providers/login-provider'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import OutlinedInput from '@mui/material/OutlinedInput'

type LoginFormFields = {
  login: string
  password: string
}

export const Login = ({
  type,
  setShowLogin,
}: {
  type: 'teacher' | 'student'
  setShowLogin: React.Dispatch<SetStateAction<boolean>>
}) => {
  const schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const { $login } = useAuthContext()
  const router = useRouter()

  const onSubmit = (data: LoginFormFields) => {
    const { login, password } = data
    $login.mutate(
      { login, password, type },
      {
        onSuccess: (success) => success && router.push(`/${type}-dashboard`),
      },
    )
  }

  return (
    <Stack
      direction="column"
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="body2">
          ავტორიზაცია,{' '}
          <span style={{ fontWeight: 'bold' }}>
            {type === 'teacher' ? 'მასწავლებელი' : 'მოსწავლე'}
          </span>
        </Typography>
        <IconButton color="primary" onClick={() => setShowLogin(false)}>
          <CloseIcon color="primary" sx={{ height: 30, width: 30 }} />
        </IconButton>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Controller
            control={control}
            name="login"
            render={({ field }) => (
              <OutlinedInput
                placeholder="პირადი ნომერი"
                type="text"
                sx={{ maxWidth: '100%', width: 320 }}
                required
                error={!!errors.login}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <OutlinedInput
                placeholder="პაროლი"
                type="password"
                sx={{ maxWidth: '100%', width: 320 }}
                required
                error={!!errors.password}
                {...field}
              />
            )}
          />
          <Button
            fullWidth
            sx={{ height: 53 }}
            type="submit"
            color="primary"
            disabled={$login.isLoading}
          >
            შესვლა
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
