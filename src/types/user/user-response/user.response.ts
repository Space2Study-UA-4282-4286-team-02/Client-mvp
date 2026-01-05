import {
  CreatedAt,
  LastLogin,
  Address,
  UserRole,
  SubjectInterface,
  Faq,
  DataByRole
} from '~/types'

export interface UserResponse {
  _id: string
  role: UserRole
  firstName: string
  lastName: string
  email: string
  mainSubjects: SubjectInterface[]
  totalReviews: DataByRole<number>
  averageRating: DataByRole<number>
  nativeLanguage: string
  address: Address
  professionalSummary?: string
  photo?: string
  lastLogin: LastLogin
  createdAt: CreatedAt
  updatedAt: string
  FAQ: DataByRole<Faq[]>
}
