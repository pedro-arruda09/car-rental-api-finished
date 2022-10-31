import sequelize from 'sequelize';
import CapitalModel from '../models/CapitalModel.js';
import removeAccents from 'remove-accents';

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

  suggest(data) {
    console.log(data);
    return CapitalModel.findAll(data);
  }
}

export default new CapitalService();