import * as yup from 'yup'
import { Button, OutlinedInput, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { forgotPassword } from 'modules/forgot-password/forgot.api'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

type ForgotSendMailFormFields = {
  mail: string
}

const schema = yup.object().shape({
  mail: yup.string().email().required(),
})
export const SendMailForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotSendMailFormFields>({
    defaultValues: {
      mail: '',
    },
    resolver: yupResolver(schema),
  })

  const $sendForgotMail = useMutation(({ mail }: { mail: string }) =>
    forgotPassword(mail),
  )

  const onSubmit = (data: ForgotSendMailFormFields) => {
    $sendForgotMail.mutate(
      { mail: data.mail },
      {
        onSuccess: (data) => {
          if (data.success) {
            onClose()
            router.push('/')
          }
        },
      },
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={5}
        p={3}
      >
        <Controller
          control={control}
          name="mail"
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              placeholder="example@gmail.com"
              type="email"
              required
              error={!!errors.mail}
              className="text-field-style"
            />
          )}
        />
        <Button
          disabled={$sendForgotMail.isLoading}
          fullWidth
          sx={{ height: 53 }}
          type="submit"
        >
          Send email
        </Button>
      </Stack>
    </form>
  )
}
