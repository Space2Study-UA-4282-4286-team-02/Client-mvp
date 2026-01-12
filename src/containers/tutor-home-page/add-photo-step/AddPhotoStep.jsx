import { useState, useRef, useCallback } from 'react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { useTranslation } from 'react-i18next'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef(null)

  const validateFile = useCallback(
    (selectedFile) => {
      if (!validationData.filesTypes.includes(selectedFile.type)) {
        return t(validationData.typeError)
      }
      if (selectedFile.size > validationData.maxFileSize) {
        return t(validationData.fileSizeError)
      }
      return null
    },
    [t]
  )

  const handleFile = useCallback(
    (selectedFile) => {
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        setFile(null)
        setPreviewUrl('')
        return
      }
      setError('')
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    },
    [validateFile]
  )

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        {previewUrl ? (
          <Box
            alt={t('becomeTutor.photo.imageAlt')}
            component='img'
            src={previewUrl}
            sx={style.img}
          />
        ) : (
          <Box
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              ...style.uploadBox,
              ...(isDragOver && style.activeDrag)
            }}
          >
            <Typography sx={style.previewText}>
              {t('becomeTutor.photo.placeholder')}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={style.rigthBox}>
        <Typography sx={style.description}>
          {t('becomeTutor.photo.description')}
        </Typography>
        <Box sx={style.fileUploader.root}>
          <Button
            fullWidth
            onClick={handleButtonClick}
            startIcon={<CloudUploadOutlinedIcon />}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            {file ? file.name : t('becomeTutor.photo.button')}
          </Button>
          <input
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
            type='file'
          />
        </Box>
        <Typography sx={style.fileSizeNote}>
          {t('becomeTutor.photo.fileSizeError')}
        </Typography>
        {error && (
          <Typography color='error' sx={style.errorText}>
            {error}
          </Typography>
        )}
        {!isMobileOrTablet && <Box sx={style.btnsBox}>{btnsBox}</Box>}
      </Box>
      {isMobileOrTablet && <Box sx={style.btnsBox}>{btnsBox}</Box>}
    </Box>
  )
}

export default AddPhotoStep
