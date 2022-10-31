import pdf from 'html-pdf';
import fs from 'fs';
import UserRentModel from '../models/UserRentModel.js';
import UserModel from '../models/UserModel.js';
import CarModel from '../models/CarModel.js';
import pdfService from '../services/pdfService.js'

const generatePDF = (pdfTemplate, filePath) => {
    console.log(pdfTemplate);
    return new Promise((resolve, reject) => {
        pdf.create(pdfTemplate, {}).toFile(filePath, (err, result) => {
            if (err) {
                reject('Deu erro');
                return;
            }
            resolve(result.filename)
        });
    })
};

const index = async () => {
    const userRent = await UserRentModel.findAll({
        include: [{
            model: UserModel,
            attributes: ['name'],
            as: 'user',
        }, {
            model: CarModel,
            attributes: ['model', 'year', 'daily_price'],
            as: 'car'
        }],
        raw: true,
        nest: true,
        attributes: [],
    });

    const user = await UserModel.findOne({
        attributes: ['name'],
        raw: true,
    })

    const rentHtml = userRent.reduce((html, current) => {

        html += `
                    <tr>
                        <td>${current.user.name}</td>
                        <td>${current.car.model}</td>
                        <td>${current.car.year}</td>
                        <td>${current.car.daily_price}</td>
                    </tr>
                `

        return html;
    }, '');

    let pdfTemplate = fs.readFileSync('html/header.html', 'UTF-8');

    pdfTemplate = pdfTemplate.replace('{{ rentHtml }}', rentHtml);
    pdfTemplate = pdfTemplate.replace('{{ user }}', user.name);

    const filePath = `./uploads/rentPDF.pdf`;

    return generatePDF(pdfTemplate, filePath);
}

export default {
    index,
    generatePDF
};