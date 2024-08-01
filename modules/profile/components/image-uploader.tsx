import { Button, Input } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import { Dispatch, SetStateAction } from 'react'
import { SxProps } from '@mui/system'
import { getRefreshToken } from 'modules/login/login.api'
import { imageUpload } from 'modules/profile/profile.api'
import { useMutation } from 'react-query'

type TFileProps = {
  file: string
}

type TImageUpload = {
  url: string
  fileName: string
  onUpdateFile: Dispatch<SetStateAction<string>>
  accept: string[]
  sx?: SxProps
}

export const ImageUploader = ({
  onUpdateFile,
  accept,
  url,
  fileName,
  sx,
}: TImageUpload) => {
  const $fileUpload = useMutation(({ file }: TFileProps) =>
    imageUpload({ file, fileName, url }),
  )

  return (
    <Button component="label" sx={sx}>
      <Input
        inputProps={{
          accept,
        }}
        onChange={(e: any) => {
          const file = e.target.files
          $fileUpload.mutate(
            {
              file,
            },
            {
              onSuccess: (data) => {
                if (data) {
                  onUpdateFile(data.url)
                  getRefreshToken()
                }
              },
            },
          )
        }}
        sx={visuallyHidden}
        type="file"
      />
    </Button>
  )
}
