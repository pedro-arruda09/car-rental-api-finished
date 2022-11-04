import pdfService from '../services/pdfService.js';
import utils from '../utils/utils.js';

class pdfController {

    async index(req, res) {
        try {
            const pdf = await pdfService.index()
            res.type('pdf');    
            res.download(pdf);
            return res.json(pdf);
        } catch (e) {
            console.log(e);
            return utils.handleError(res, 'Unable to generate PDF!');
        }
    }
};

export default new pdfController();