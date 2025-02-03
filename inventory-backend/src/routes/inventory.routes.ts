import { Router } from 'express';
import InventoryController from '../controllers/inventory.controller';

const router = Router();

router.post('/electronics', (req, res, next) => {
  req.body.category = 'Electronics';
  next();
}, InventoryController.createItem);

router.post('/grocery', (req, res, next) => {
  req.body.category = 'Grocery';
  next();
}, InventoryController.createItem);

router.post('/clothing', (req, res, next) => {
  req.body.category = 'Clothing';
  next();
}, InventoryController.createItem);

router.get('/total-value', InventoryController.getTotalValue);
router.get('/low-stock', InventoryController.getLowStockItems);

router.get('/', InventoryController.getItems);
router.get('/:id', InventoryController.getItem);
router.put('/:id', InventoryController.updateItem);
router.delete('/:id', InventoryController.deleteItem);

export default router;
