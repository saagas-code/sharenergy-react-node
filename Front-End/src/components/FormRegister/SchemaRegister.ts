import {object, ref, string} from 'yup'

export const SchemaRegister = object({
  username: string().required("Campo obrigatório.").min(4, "Minimo de 4 caracteres"),
  fullname: string().required("Campo obrigatório.").min(4, "Minimo de 4 caracteres"),
  email: string().required("Campo obrigatório.").email("Insira um email válido."),
  password: string().required("Campo obrigatório.").min(4, "Minimo de 4 caracteres"),
  passwordConfirm: string().required("Campo obrigatório").oneOf([ref('password')], 'Senhas não batem')
})