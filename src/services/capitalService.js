import { literal, Op } from 'sequelize';
import CapitalModel from '../models/CapitalModel.js';

class CapitalService {

  index() {
    return CapitalModel.findAll({
      attributes: ['id', 'name', 'state'],
      raw: true,
      nest: true,
    });
  }

  store(data) {
    return CapitalModel.create(data);
  }

  show(filter) {
    return CapitalModel.findOne({
      where: filter
    })
  }

  update(filter, changes) {
    return CapitalModel.update(changes, {
      where: filter,
    });
  }

  async delete(filter) {
    await this.show(filter);

    return CapitalModel.destroy({
      where: filter
    });
  }

  suggest(search) {
    return CapitalModel.findAll({
      attributes: ['id', 'name'],
      where: {
        [Op.iLike]: literal(`unaccent(name) ILIKE unaccent(:search)`),
      },
      replacements: {
        search: `%${search}%`
      },
      logging: true,
      raw: true,
      limit: 10
    });
  }
}

export default new CapitalService();