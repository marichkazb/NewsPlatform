import * as yup from "yup";



export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  email: yup
    .string()
    .required('Email is required'),
  password: yup
    .string()
    .min(1, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Password is required'),
  verify_password: yup
    .string()
    .min(1, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Password verification is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

})
