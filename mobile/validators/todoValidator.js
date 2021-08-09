import * as yup from "yup";



export const postValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Give a name to your article'),
  description: yup
    .string()
    .min(10, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Reach readers with an interesting idea'),
  time: yup
    .number()
    .min(4, ({min, value}) => `${min - value.length} characters to go`)
    .required('How long will it take to read your article?'),
})
