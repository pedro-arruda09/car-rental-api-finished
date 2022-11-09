import * as Yup from 'yup';

export default {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      state: Yup.string().required("State is required."),
    }).noUnknown(),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      state: Yup.string().required("State is required."),
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
  suggest: {
    query: Yup.object().shape({
      search: Yup.string().required()
    }).noUnknown()
  }
}