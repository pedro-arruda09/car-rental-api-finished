import * as Yup from 'yup';

export default {
  rent: {
    body: Yup.object().shape({
      car_id: Yup.array().required(),
    //   email: Yup.string().required(),
    }),
  },
//   returnCar: {
//     body: Yup.object().shape({
//       name: Yup.string().required().min(3).max(255),
//       email: Yup.string().required(),
//       password: Yup.string().nullable().min(6).max(50),
//     }),     
//   },
}