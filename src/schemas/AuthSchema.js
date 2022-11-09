import Yup from 'yup';

export default {
    store: {
        body: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(3).required(),
        }).noUnknown()
    }
}