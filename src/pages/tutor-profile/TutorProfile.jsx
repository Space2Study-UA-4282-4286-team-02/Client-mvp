import { useCallback, useMemo } from 'react'
import { useAppSelector } from '~/hooks/use-redux'

import ProfileInfo from '~/containers/tutor-profile/profile-info/ProfileInfo'
import CompleteProfileBlock from '~/components/complete-profile/CompleteProfileBlock'
import VideoPresentation from '~/containers/tutor-profile/video-presentation/VideoPresentation'
import CommentsWithRatingBlock from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRaitngBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'

import { profileItems } from '~/components/profile-item/complete-profile.constants'
import { defaultResponses } from '~/constants'
import { useLoaderData } from 'react-router-dom'

const TutorProfile = () => {
  const loaderData = useLoaderData()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const authorFromLoader =
    loaderData?.data?.author || loaderData?.author || loaderData?.data

  const hasAuthor = !!(authorFromLoader && authorFromLoader.firstName)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { loading, response: myData } = useAxios({
    service: getUserData,
    fetchOnMount: !hasAuthor,
    defaultResponse: defaultResponses.object
  })

  const rawData = hasAuthor ? authorFromLoader : myData

  const userData = useMemo(() => {
    if (!rawData || Object.keys(rawData).length === 0) return null

    const role = Array.isArray(rawData.role)
      ? rawData.role[0]
      : rawData.role || userRole

    return {
      ...rawData,
      role: role,
      mainSubjects: {
        tutor: rawData.mainSubjects?.tutor || [],
        student: rawData.mainSubjects?.student || []
      },
      averageRating: rawData.averageRating || { tutor: 0, student: 0 },
      totalReviews: rawData.totalReviews || { tutor: 0, student: 0 }
    }
  }, [rawData, userRole])

  if (!userData || (loading && !hasAuthor)) {
    return <Loader pageLoad size={70} />
  }

  console.log(authorFromLoader)

  return (
    <PageWrapper>
      <ProfileInfo userData={userData} />
      {!loaderData && (
        <CompleteProfileBlock data={userData} profileItems={profileItems} />
      )}
      <VideoPresentation />
      <CommentsWithRatingBlock
        averageRating={userData.averageRating[userData.role] || 0}
        reviewsCount={userData.reviewStats?.counts || []}
        totalReviews={userData.totalReviews[userData.role] || 0}
      />
    </PageWrapper>
  )
}

export default TutorProfile
