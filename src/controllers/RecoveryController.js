import recoveryService from '../services/recoveryService.js';

class RecoveryController {

    async recovery (req, res) {
        try {
            const user = await recoveryService.recovery(req.data);

            return res.json(user)
        } catch(e) {
            console.log(e);
        }
    }

    async validateToken (req, res) {
        try {
            const validate = await recoveryService.validateToken(req.filter.token);

            return res.json(validate);
        } catch (e) {
            console.log(e);
        }
    }

    async changePassword (req, res) {
        try {
            const changes = { password: req.data.password };
            const token = req.params.token;
            const ip = req.socket.remoteAddress;

            await recoveryService.changePassword(changes, token, ip);

            return res.json(recoveryService);
        } catch (e) {
            console.log(e);
            return res.status(400).json('Erro no cadastro');
        }
    }
}

export default new RecoveryController();