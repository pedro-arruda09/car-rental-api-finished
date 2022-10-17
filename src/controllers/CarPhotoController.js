const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const utils = require('../utils/utils');
const carPhotoService = require('../services/carPhotoService');
const upload = multer(multerConfig).single('bookCover');

module.exports = {

  async index(req, res) {
    const book_covers = await carPhotoService.index({
      attributes: ['originalname']
    });
    return utils.handleResponse(res, book_covers)
  },

  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        console.log(error);
        return res.status(401).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { book_id } = req.body;
        await carPhotoService.store({ originalname, filename, book_id, admin_id: req.adminId })
        return utils.handleResponse(res, 'The book cover was registered.')
      } catch (e) {
        return utils.handleError(res, e);
      }
    })
  },

  async delete(req, res) {
    try {
      await carPhotoService.delete({
        where: {
          id: req.params.id,
          admin_id: req.adminId
        }
      });

      return utils.handleResponse(res, 'The book cover was deleted succesfully.');
    } catch (e) {
      console.log(e);
      return utils.handleError(res, e);
    }
  },
}