import { Router } from 'express';
import { authPrivate } from '../utils/authPrivate';
import * as categoryController from '../controllers/category';
import * as productController from '../controllers/product';

const router = Router();

router.get('/ping', authPrivate, (req, res) => res.json({ pong: true }));

router.post('/categories', authPrivate, categoryController.add);
router.put('/categories/:id', authPrivate, categoryController.update);
router.delete('/categories/:id', authPrivate, categoryController.remove);

router.post('/categories/:category_id/products', authPrivate, productController.add);
router.put(
    '/categories/:category_id/products/:id',
    authPrivate,
    productController.update
);
router.delete(
    '/categories/:category_id/products/:id',
    authPrivate,
    productController.remove
);

export default router;
