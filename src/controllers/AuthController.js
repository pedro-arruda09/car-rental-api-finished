import authService from '../services/authService.js';
 
class AuthController {
    async store(req, res) {
        try {
            const token = await authService.store(req.data);
            
            return res.json(token);
        } catch(e) {
            console.log(e);
           return res.status(400).json(e.message);
        }
    }
}

export default new AuthController();