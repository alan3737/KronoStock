import express from 'express';
import * as productsController from '../controllers/productsController.js'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res);
  res.send('respond with a resource');
});

router.get('/:id', productsController.getProductDetails)

router.get('/top/:count', productsController.getTopProducts)

router.get('/search/:productName', productsController.getKeyWordProductInSearch);

router.get('/history/price/:id', productsController.getProductHistoryPrice)

router.get('/history/status/:id', productsController.getProductHistoryPrice)
export default router;

