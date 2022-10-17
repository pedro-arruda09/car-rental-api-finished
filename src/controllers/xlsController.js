const xlsx = require('xlsx');
const xlsService = require('../services/xlsService');
const path = require('path');

const exportUsersToExcel = (user, workSheetColumnNames, workSheetName, filePath) => {
    const data = user.map(user => {
        return [user.id, user.name, user.email, user.car.model, user.car.year, user.car.chassi];
    });
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));

    return true;
};

const index = async (req, res) => {
    const user = await xlsService.index({
        admin_id: req.adminId
    });

    const workSheetColumnNames = ['ID', 'Name', 'Email', 'Car Model', 'Car Year', 'Car Chassi'];
    const workSheetName = 'Users';
    const filePath = './uploads/users.xlsx';

    const response = exportUsersToExcel(user, workSheetColumnNames, workSheetName, filePath);

    return res.json(true);
};

module.exports = {
    index
};