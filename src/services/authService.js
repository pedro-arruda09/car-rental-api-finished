import UserModel from '../models/UserModel.js';
import UserAccessLogsModel from '../models/UserAccessLogsModel.js';
import userAccessLogsService from './userAccessLogsService.js';
import sendEmailService from './sendEmailService.js';

import jwt from 'jsonwebtoken';
import moment from 'moment';
import pkg from 'bcryptjs';
const { compareSync } = pkg;
class AuthService {

    async store(data) {
        const user = await UserModel.findOne({
            where: {
                email: data.email,
                is_blocked: false
            },
            raw: true,
            attributes: ['id', 'name', 'email', 'password_hash']
        })

        if (!user) {
            throw new Error('User does not exist.');
        }

        const isValidPassword = compareSync(data.password, user.password_hash);

        if (!isValidPassword) {
            const allowBlockUser = await userAccessLogsService.checkAccess({
                user_id: user.id
            })

            if (!allowBlockUser) {
                await UserAccessLogsModel.create({
                  user_id: user.id,
                  status: 'FAIL'
                })
        
                throw new Error('Invalid password.');
              }

              await UserModel.update({
                is_blocked: true
              }, {
                where: {
                  id: user.id
                }
              });
        
              const options = {
                context: {
                  user,
                  date: moment().format('DD/MM/YYYY [às] HH:mm'),
                },
                subject: 'Usuário Bloqueado',
                template: 'is-blocked',
              };
        
              await sendEmailService.sendEmail(options, user.email);
        
              throw new Error('Usuário bloqueado, entre em contato com o suporte.');
        }

        await UserAccessLogsModel.create({
            user_id: user.id,
            status: 'SUCCESS'
          })
      
          const token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
          });

          return token;
    }
}

export default new AuthService();