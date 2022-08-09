// List dos carros
const pdf = require('html-pdf');
const CarModel = require('../models/CarModel');
const UserModel = require('../models/UserModel');
const fs = require('fs');


module.exports = {
    async index(req, res) {

        try {
            const user = await UserModel.findAll({
                where: {
                    id: req.userId
                },
                attributes: ['name'],
                raw: true
            })

            const userHTML = user.reduce((html, user) => {
                html += `${user.name}`

                return html;
            }, '');

            const cars = await CarModel.findAll({
                where: {
                    user_id: req.userId
                },
                attributes: ['model', 'year', 'chassi'],
                raw: true
            });

            const carHTML = cars.reduce((html, car) => {
                html += `
                    <tr>
                        <td>${car.model}</td>
                        <td>${car.year}</td>
                        <td>${car.chassi}</td>
                    </tr>
                        `

                return html;
            }, '');

            const head = fs.readFileSync('html/header.html', 'UTF-8');

            const htmlIndex = head + `
                <h3>Cars of user ${userHTML}</h3>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Chassi</th>
                            </tr>
                        </thead>
                        <tbody>${carHTML}</tbody>
                    </table>
                `

            pdf.create(htmlIndex, {}).toFile("./uploads/meupdf.pdf", err => {
                if (err) {
                    return res.status(400).json({ error: "Unable to create PDF." });
                }

                res.type('pdf');
                res.download('./uploads/meupdf.pdf');
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ error: "The car does not exist." });
        }

    }

}

