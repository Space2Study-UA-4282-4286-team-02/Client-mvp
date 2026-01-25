export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjRmYTQ5ZDM5Yzk4OGUzNDdkODMzZiIsInJvbGUiOiJzdHVkZW50IiwiaXNGaXJzdExvZ2luIjp0cnVlLCJpYXQiOjE2NjAyMjIwNDMsImV4cCI6MTY2MDIyNTY0M30.Gr10O-Ri3k_SJfXb41Yojx7toZvEz5RUekZVHLHEVOw'

export const loginUserData = { email: 'user@gmail.com', password: '123' }

export const signupUserData = {
  email: 'user@gmail.com',
  password: 'testest_1',
  confirmPassword: 'testest_1',
  firstName: 'John',
  lastName: 'Doe'
}

export const initialState = {
  accessToken: '',
  userId: '',
  userRole: '',
  authLoading: false,
  loading: true,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterLogin = {
  accessToken: accessToken,
  userId: '62f4fa49d39c988e347d833f',
  userRole: 'student',
  authLoading: false,
  loading: false,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterSignup = {
  accessToken: '',
  userId: '',
  userRole: '',
  loading: false,
  pageLoad: false,
  authLoading: false,
  error: '',
  isFirstLogin: true
}

export const errorMessage = 'Request failed with status code 404'
export const errorCode = 'USER_NOT_REGISTERED'
