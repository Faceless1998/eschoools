import { Box } from '@mui/system'
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
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
import { checkAuthServerSide } from 'cookies'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { changePassword } from 'modules/change-password/change-password.api'
import { useMutation } from 'react-query'

export type ChangePasswordFormFields = {
  currentPassword: string
  password: string
  repeatPassword: string
}

const schema = yup.object().shape({
  currentPassword: yup.string().required(),
  password: yup.string().required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
})

const useStyles = makeStyles({
  eye: { cursor: 'pointer' },
})

const ChangePassword = () => {
  const router = useRouter()
  const { user } = useAuthContext()

  const { t } = useAuthContext()
  const styles = useStyles()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormFields>({
    defaultValues: {
      currentPassword: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(schema),
  })

  const $changePassword = useMutation(
    ({ body }: { body: ChangePasswordFormFields }) =>
      changePassword({
        body: {
          currentPassword: body.currentPassword,
          password: body.password,
        },
      }),
  )

  const onSubmit = (body: ChangePasswordFormFields) => {
    $changePassword.mutate(
      { body },
      {
        onSuccess: ({ success }) => {
          if (success) {
            reset()
            router.push(
              `${
                user && user.role === 'teacher'
                  ? '/teacher-dashboard'
                  : '/student-dashboard'
              }`,
            )
          }
        },
      },
    )
  }

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const handleCurrentPasswordEye = () => setShowCurrentPassword((prev) => !prev)

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordEye = () => setShowPassword((prev) => !prev)

  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const handleRepeatPasswordEye = () => setShowRepeatPassword((prev) => !prev)

  if (!user) return null

  return (
    <Container sx={{ margin: '20px auto', maxWidth: '100%', width: 600 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Box>
            <VerifiedUserIcon color="primary" sx={{ fontSize: 70, mb: 3 }} />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field }) => (
                    <TextField
                      placeholder={t.labels.currentPassword}
                      type={showCurrentPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      error={!!errors.currentPassword}
                      {...field}
                      className="text-field-style"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!showCurrentPassword ? (
                              <RemoveRedEye
                                className={styles.eye}
                                onClick={handleCurrentPasswordEye}
                              />
                            ) : (
                              <VisibilityOffIcon
                                className={styles.eye}
                                onClick={handleCurrentPasswordEye}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
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
              color="primary"
            >
              {t.labels.change_password}
            </Button>
            <Button
              sx={{ height: 53, mt: 1 }}
              fullWidth
              disabled={$changePassword.isLoading}
              onClick={() =>
                router.push(
                  `${
                    user && user.role === 'teacher'
                      ? '/teacher-dashboard'
                      : '/student-dashboard'
                  }`,
                )
              }
              color="primary"
              variant="outlined"
            >
              უკან დაბრუნება
            </Button>
          </form>
        </Stack>
      </Paper>
    </Container>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) =>
  checkAuthServerSide(ctx)

export default ChangePassword
