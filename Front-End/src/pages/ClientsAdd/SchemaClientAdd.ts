import {object, string} from 'yup'

export const AddClientSchema = object({
  name: string().required("Campo obrigatório.").min(4, "Minimo de 4 caracteres"),
  email: string().required("Campo obrigatório.").email("Insira um email válido."),
  phone: string().required("Campo obrigatório.").min(11, "Minimo de 11 caracteres").max(13, "Máximo de 13 Caracteres"),
  address: string().required("Campo obrigatório."),
  cpf: string().required("Campo obrigatório.").min(11, "Minimo de 12 caracteres").max(11)
})