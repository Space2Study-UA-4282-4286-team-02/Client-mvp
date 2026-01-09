import { nameField, emptyField, textField } from './common'

export const firstName = (value) => {
  return nameField(value)
}

export const lastName = (value) => {
  return nameField(value)
}

export const country = (value) => {
  return emptyField(value)
}

export const city = (value) => {
  return emptyField(value)
}
export const professionalSummary = (value) => {
  return textField(0, 100)(value)
}
