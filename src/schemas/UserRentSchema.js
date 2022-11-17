import * as Yup from 'yup';

const schema = {
  rent: {
    body: Yup.object().shape({
      car_id: Yup.array().of(Yup.number().min(1)).required(),
      rent_started_at: Yup.date().required(),
      rent_end_at: Yup.date().min(Yup.ref('rent_started_at'), "End date can't be before start date").required(),
      capital_id: Yup.number().required()
    }).noUnknown(),
  },

  returnCar: {
    params: Yup.object().shape({
      id: Yup.number().required(),
      car_id: Yup.number().required(),
    }).noUnknown(),     
  },

  rentTotal: {
    params: Yup.object().shape({
      id: Yup.number().required()
    }).noUnknown()
  }
}

export default schema;