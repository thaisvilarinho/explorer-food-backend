const { Router } = require('express');
const multer = require('multer');

const DishesController = require('../controllers/DishesController');
const uploadConfig = require('../configs/upload');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesController = new DishesController();
const dishesRoutes = Router();

const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post('/', verifyUserAuthorization(['admin']), upload.single('image'), dishesController.create);
dishesRoutes.put('/:id', verifyUserAuthorization(['admin']), upload.single('image'), dishesController.update);
dishesRoutes.get('/', dishesController.index);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.delete('/:id', verifyUserAuthorization(['admin']), dishesController.delete)

module.exports = dishesRoutes;