import express from 'express';
import * as productsController from '../controllers/productsController.js'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
<<<<<<< HEAD

router.get('/:productName', productsController.getKeyWordProductFromAllCompanies);
=======
router.get('/search/:productName', productsController.getKeyWordProductFromAllCompanies);
>>>>>>> a9a33d8fc5b46465db50749da6defda717666589

export default router;

