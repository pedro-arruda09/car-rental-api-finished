import capitalService from '../services/capitalService.js';
import utils from '../utils/utils.js';

class CapitalController {
    async index(req, res) {
        try {
            const capital = await capitalService.index();

            return utils.handleResponse(res, capital);
        } catch (e) {
            return utils.handleError(res, 'Unable to view capital');
        }
    }

    async store(req, res) {
        try {
            const createCapital = await capitalService.store({
                ...req.data,
            });

            return utils.handleResponse(res, createCapital);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const capital = await capitalService.show({
                ...req.filter,
            });
            return utils.handleResponse(res, capital);
        } catch (e) {
            return utils.handleError(res, e)
        }
    }

    async update(req, res) {
        try {
            const changes = req.data;
            const filter = {
                id: req.filter.id,
            };

            await capitalService.update(filter, changes);

            return utils.handleResponse(res, changes);
        } catch (e) {
            return utils.handleError(res, e)
        }
    }

    async delete(req, res) {
        try {
            await capitalService.delete({
                ...req.filter,
            });

            return utils.handleResponse(res, `The capital was deleted succesfully.`);
        } catch (e) {
            return utils.handleError(res, e);
        }
    }

    async suggest(req, res) {
        const search = req.filter.search;

        try {
            const capitals = await capitalService.suggest(search)
            
            return res.json(capitals);

        } catch (e) {
            console.log(e);
        }


    }
}

export default new CapitalController();