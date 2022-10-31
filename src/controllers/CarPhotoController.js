import multer from 'multer';
import multerConfig from '../config/multerConfig.js';
import utils from '../utils/utils.js';
import carPhotoService from '../services/carPhotoService.js'
const upload = multer(multerConfig).single('carPhoto');

class CarPhotoController {

  async index(req, res) {
    const car_photo = await carPhotoService.index({
      attributes: ['originalname']
    });
    return utils.handleResponse(res, car_photo)
  }

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
        const { car_id } = req.body;
        await carPhotoService.store({ originalname, filename, car_id })
        return utils.handleResponse(res, 'The car photo was registered.')
      } catch (e) {
        return utils.handleError(res, e);
      }
    })
  }

  async updateCars(req, res) {
    try {
      await carPhotoService.updateCars({
        id: req.params.id,
        car_id: req.body.car_id
      })
      return res.json("Car update made");
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "This update cannot be made",
      });
    }
  }

  async delete(req, res) {
    try {
      await carPhotoService.delete({
        where: {
          id: req.params.id,
        }
      });

      return utils.handleResponse(res, 'The car photo was deleted succesfully.');
    } catch (e) {
      console.log(e);
      return utils.handleError(res, e);
    }
  }
};

export default new CarPhotoController();