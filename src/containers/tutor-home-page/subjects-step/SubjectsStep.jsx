import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useStepContext } from '~/context/step-context'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const selectedSubjects = stepData[stepLabel] || []

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [error, setError] = useState('')

  const { loading: categoriesLoading, response: categories } =
    useCategoriesNames()

  const categoryId = selectedCategory?._id ?? null
  const {
    loading: subjectsLoading,
    response: subjects,
    fetchData: fetchSubjects
  } = useSubjectsNames({
    category: categoryId,
    fetchOnMount: false
  })

  useEffect(() => {
    if (categoryId) {
      void fetchSubjects()
    } else {
      setSelectedSubject(null)
    }
  }, [categoryId, fetchSubjects])

  const subjectOptions = useMemo(() => subjects || [], [subjects])

  const handleAddSubject = () => {
    if (!selectedCategory || !selectedSubject) {
      setError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const isAlreadyAdded = selectedSubjects.some(
      (item) => item._id === selectedSubject._id
    )

    if (isAlreadyAdded) {
      setError(t('becomeTutor.categories.sameSubject'))
      return
    }

    handleStepData(stepLabel, [...selectedSubjects, selectedSubject])
    setSelectedSubject(null)
    setError('')
  }

  const handleChipDelete = (id) => {
    if (!id) {
      return
    }
    handleStepData(
      stepLabel,
      selectedSubjects.filter((item) => item._id !== id)
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.content}>
          <TitleWithDescription
            description={t('becomeTutor.categories.title')}
            style={styles.titleDescription}
            title=''
          />
          <Typography sx={styles.inputTitle}>
            {t('becomeTutor.categories.mainSubjectsLabel')}
          </Typography>
          <AppAutoComplete
            getOptionLabel={(option) => option?.name ?? ''}
            isOptionEqualToValue={(option, value) => option?._id === value?._id}
            loading={categoriesLoading}
            onChange={(_, value) => {
              setSelectedCategory(value)
              setSelectedSubject(null)
              setError('')
            }}
            options={categories || []}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={selectedCategory}
          />
          <Typography sx={styles.inputTitle}>
            {t('becomeTutor.categories.subjectLabel')}
          </Typography>
          <AppAutoComplete
            disabled={!selectedCategory}
            getOptionLabel={(option) => option?.name ?? ''}
            isOptionEqualToValue={(option, value) => option?._id === value?._id}
            loading={subjectsLoading}
            onChange={(_, value) => {
              setSelectedSubject(value)
              setError('')
            }}
            options={subjectOptions}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={selectedSubject}
          />
          <AppButton
            onClick={handleAddSubject}
            sx={styles.addSubjectButton}
            variant='outlined'
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          {error && <Typography sx={styles.errorText}>{error}</Typography>}
          {selectedSubjects.length > 0 && (
            <AppChipList
              defaultQuantity={2}
              handleChipDelete={(name) =>
                handleChipDelete(
                  selectedSubjects.find((item) => item.name === name)?._id
                )
              }
              items={selectedSubjects.map((item) => item.name)}
              wrapperStyle={styles.chipsWrapper}
            />
          )}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
