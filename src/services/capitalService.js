const CapitalModel = require('../models/CapitalModel');

module.exports = {

  index() {
    return CapitalModel.findAll({
      attributes: ['name', 'state'],
      raw: true,
      nest: true,
    });
  },

  store(data) {
    return CapitalModel.create(data);
  },

  show(filter) {
    return CapitalModel.findOne({
      where: filter
    })
  },

  update(filter, changes) {
    return CapitalModel.update(changes, {
      where: filter,
    });
  },

  async delete(filter) {
    await this.show(filter);

    return CapitalModel.destroy({
      where: filter
    });
  },

  suggest(data) {
    return CapitalModel.findAll(data);
  }
}