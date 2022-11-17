import * as Yup from 'yup'

const schema = {
  store: {
    file: Yup.object().shape({
      car_id: Yup.number().required(),
      fieldname: Yup.string().required(),
      carPhoto: Yup.string().required(),
      encoding: Yup.string().required(),
      mimetype: Yup.string().oneOf(['image/png', 'image/jpeg']).required(),
      destination: Yup.string().required(),
      filename: Yup.string().required(),
      path: Yup.string().required(),
      size: Yup.number().integer().positive().max(1024*1024, 'file is too big').required('there is no file to be posted')
    }).required().noUnknown(),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required()
    }).noUnknown
  },
  updateCars: {
    body: Yup.object().shape({
      car_id: Yup.number().required(),
    }).noUnknown(),
    params: Yup.object().shape({
      id: Yup.number().required()
    }).noUnknown()
  }
}

export default schema;