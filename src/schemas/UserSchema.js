import * as Yup from 'yup';

const schema = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).max(50),
      cpf: Yup.string().min(11).max(11).required()
    }).noUnknown(),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      email: Yup.string().required(),
      password: Yup.string().nullable().min(6).max(50),
      cpf: Yup.string().min(11).max(11).required()
    }).noUnknown(),     
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }).noUnknown(),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }).noUnknown(),
  },
}

export default schema;