import userAccessLogsService from "../services/userAccessLogsService.js";

class userAccessLogsController {

    async checkAccess(req, res) {
        try {
            const filter = {
                user_id: req.userId
            }

            const accessLogs = await userAccessLogsService.checkAccess(filter)

            return res.json(accessLogs);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new userAccessLogsController();