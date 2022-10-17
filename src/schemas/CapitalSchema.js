const Yup = require('yup');

const schema = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      state: Yup.string().required("State is required."),
    })
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      state: Yup.string().required("State is required."),
    }),
    params: Yup.object().shape({
      id: Yup.number(),
    }),
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
  suggest: {
    query: Yup.object().shape({
      name: Yup.string().required()
    })
  }
}

module.exports = schema;