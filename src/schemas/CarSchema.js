import * as Yup from 'yup';

const schema = {
  store: {
    body: Yup.object().shape({
      model: Yup.string().required("Model is required.").min(3).max(255),
      year: Yup.number().required("Year is required."),
      chassi: Yup.string().required("Chassi is required.").min(17).max(17),
      daily_price: Yup.number().required("Daily price is required."),
      admin_id: Yup.number().required()
    }).noUnknown()
  },
  update: {
    body: Yup.object().shape({
      model: Yup.string().required("Model is required.").min(3).max(255),
      year: Yup.number().required("Year is required.").min(4).max(4),
      chassi: Yup.string().required("Chassi is required.").min(17).max(17),
      daily_price: Yup.number().required("Daily price is required.")
    }).noUnknown(),
    params: Yup.object().shape({
      id: Yup.number(),
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