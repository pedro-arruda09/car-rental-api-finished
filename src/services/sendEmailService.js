import mailerService from '../services/mailerService.js';

const sendEmail = (options, to) => {
    return new Promise((resolve, reject) =>
        mailerService.sendMail({
            ...options,
            from: 'Locadora <naoresponda@locadora.com>',
            to: [to],
        }, error => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        })
    )
}

export default {
    sendEmail
}