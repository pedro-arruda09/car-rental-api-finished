const pdf = require('html-pdf');
const fs = require('fs');
const pdfService = require('../services/pdfService');

const generatePDF = (pdfTemplate, filePath) => {
    return new Promise((resolve, reject) => {
        pdf.create(pdfTemplate, {}).toFile(filePath, (err, result) => {
            if (err) {
                reject('Deu erro');
                return;
            }

            resolve(result.filename)
        });
    })
}
const index = async (req, res) => {

    try {
        const user = await pdfService.index({
            user_id: req.userId
        });

        const { user_name, data } = user.reduce((previousObject, currentObject) => {
            const carData = {
                id: currentObject.car.id,
                year: currentObject.car.year,
                model: currentObject.car.model,
                chassi: currentObject.car.chassi
            };

            if (previousObject.user_name) {
                previousObject.data.push(carData)

                return previousObject;
            }

            return {
                user_name: currentObject.name,
                data: [carData]
            }
        }, {});

        let carsHtml = '';

        data.forEach(car => {
            carsHtml += `
                <tr>
                    <td>${car.id}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                    <td>${car.chassi}</td>
                </tr>
            `;
        });

        let pdfTemplate = fs.readFileSync('html/header.html', 'UTF-8');

        pdfTemplate = pdfTemplate.replace('{{ userName }}', user_name);
        pdfTemplate = pdfTemplate.replace('{{ carsHtml }}', carsHtml);

        const filePath = `./uploads/carsPDF.pdf`;

        const pdfCreated = await generatePDF(pdfTemplate, filePath);

        res.type('pdf');
        res.download(pdfCreated);


    } catch (e) {
        console.log(e);

    }
}
module.exports = {
    index
};