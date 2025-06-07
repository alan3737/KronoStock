import express from 'express';
import * as productsController from '../controllers/productsController.js'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', productsController.getProductDetails)

router.get('/top', productsController.getTopProducts)

router.get('/search/:productName', productsController.getKeyWordProductFromAllCompanies);

router.get('/history/price/:productName', productsController.getProductHistory)

router.get('/history/status/:productName', productsController.getProductHistory)
export default router;

