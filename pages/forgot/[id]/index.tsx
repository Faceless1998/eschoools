import { Box } from '@mui/system'
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { useAuthContext } from 'providers/login-provider'
import { yupResolver } from '@hookform/resolvers/yup'

import { RemoveRedEye } from '@mui/icons-material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { makeStyles } from '@mui/styles'

import { GetServerSidePropsContext } from 'next'
import { generateRedirectRoute } from 'cookies'
import { useState } from 'react'

import {
  forgotPasswordChange,
  forgotPasswordValidation,
} from 'modules/forgot-password/forgot.api'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

export type ChangePasswordFormFields = {
  password: string
  repeatPassword: string
}

const schema = yup.object().shape({
  password: yup.string().required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
})

const useStyles = makeStyles({
  eye: { cursor: 'pointer' },
})

const ChangeForgottenPassword = ({ id }: { id: string }) => {
  const { t } = useAuthContext()
  const styles = useStyles()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormFields>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema),
  })

  const $changePassword = useMutation(
    ({ body }: { body: ChangePasswordFormFields }) =>
      forgotPasswordChange({
        id,
        password: body.password,
      }),
  )

  const onSubmit = (body: ChangePasswordFormFields) => {
    $changePassword.mutate(
      { body },
      {
        onSuccess: () => router.push('/login'),
      },
    )
  }

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordEye = () => setShowPassword((prev) => !prev)

  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const handleRepeatPasswordEye = () => setShowRepeatPassword((prev) => !prev)

  return (
    <Container sx={{ margin: '50px auto', width: 400 }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Box>
          <VerifiedUserIcon
            sx={{ color: 'var(--btn-bg-color)', fontSize: 70, mb: 3 }}
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    placeholder={t.labels.password}
                    type={showPassword ? 'text' : 'password'}
                    required
                    fullWidth
                    error={!!errors.password}
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!showPassword ? (
                            <RemoveRedEye
                              className={styles.eye}
                              onClick={handlePasswordEye}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className={styles.eye}
                              onClick={handlePasswordEye}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    className="text-field-style"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                control={control}
                name="repeatPassword"
                render={({ field }) => (
                  <TextField
                    placeholder={t.labels.repeatPassword}
                    fullWidth
                    type={showRepeatPassword ? 'text' : 'password'}
                    required
                    error={!!errors.repeatPassword}
                    {...field}
                    className="text-field-style"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!showRepeatPassword ? (
                            <RemoveRedEye
                              className={styles.eye}
                              onClick={handleRepeatPasswordEye}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className={styles.eye}
                              onClick={handleRepeatPasswordEye}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Typography sx={{ color: '#d32f2f', mt: '5px' }}>
                {errors?.repeatPassword?.message}
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{ height: 53, mt: 2 }}
            fullWidth
            disabled={$changePassword.isLoading}
            color="info"
          >
            {t.labels.change_password}
          </Button>
        </form>
      </Stack>
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query
  if (id) {
    const res = await forgotPasswordValidation(id.toString())

    if (res.success) {
      return { props: { id } }
    } else {
      return {
        redirect: generateRedirectRoute('/', false),
      }
    }
  } else {
    return {
      redirect: generateRedirectRoute('/', false),
    }
  }
}

export default ChangeForgottenPassword
