import express from 'express';
import * as productsController from '../controllers/productsController.js'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:productName', productsController.getKeyWordProductFromAllCompanies);

export default router;

