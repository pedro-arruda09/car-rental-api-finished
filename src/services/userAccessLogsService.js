import UserAccessLogsModel from "../models/UserAccessLogsModel.js";

class UserAccessLogsService {

    async checkAccess (filter) {
        const accessLogs = await UserAccessLogsModel.findAll({
            where: filter,
            raw: true,
            attributes: ['status'],
            order: [['id', 'DESC']],
            limit: 3
        })

        return accessLogs.length === 3 && accessLogs.every(log => {
            return log.status === 'FAIL'
        })
    }
}   

export default new UserAccessLogsService();