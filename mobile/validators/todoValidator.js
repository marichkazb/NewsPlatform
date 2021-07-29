import * as yup from "yup";



export const postValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string()
    .min(1, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Blog post is required'),
  year: yup
    .string()
    .required('Year is required'),


})
