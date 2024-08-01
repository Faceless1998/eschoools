/* eslint-disable @next/next/no-img-element */
import { Button, Input, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { fileUpload } from 'modules/profile/profile.api'
import { visuallyHidden } from '@mui/utils'

import { getRefreshToken } from 'modules/login/login.api'
import { useMutation } from 'react-query'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

export type FileEvent = UIEvent & {
  target: HTMLInputElement & { files: Array<string> }
}

type TFileProps = {
  file: string
}

export const FileUploader = ({
  setFileUrl,
  accept,
}: {
  setFileUrl: Dispatch<SetStateAction<string>>
  accept: string[]
}) => {
  const cvFileOptions = {
    fileName: 'cv',
    url: '/profile/cv/upload',
  }

  const $fileUpload = useMutation(({ file }: TFileProps) =>
    fileUpload({ file, ...cvFileOptions }),
  )

  return (
    <Button
      component="label"
      className="box-shadow"
      sx={{
        alignItems: 'center',
        backgroundPosition: 'center',
        display: 'flex',
        gap: 3,
        height: '90px',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <PictureAsPdfIcon sx={{ fontSize: 50 }} />
      <Typography sx={{ color: 'white', fontSize: '20px' }}>
        ატვირთეთ CV.pdf
      </Typography>
      <form>
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
                    setFileUrl(data.url)
                    getRefreshToken()
                  }
                },
              },
            )
          }}
          sx={visuallyHidden}
          type="file"
        />
      </form>
    </Button>
  )
}

export const ResourceUploader = ({
  accept,
  courseID,
  setResources,
}: {
  accept: string[]
  courseID: string
  setResources: Dispatch<SetStateAction<any[]>>
}) => {
  const resourceFileOptions = {
    fileName: 'resource',
    url: `/resources/add/${courseID}`,
  }

  const $fileUpload = useMutation(({ file }: TFileProps) =>
    fileUpload({ file, ...resourceFileOptions }),
  )

  return (
    <Button component="label" color="info" sx={{ mb: 1 }}>
      PDF - ის ატვირთვა
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
                  setResources(data.resources)
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
