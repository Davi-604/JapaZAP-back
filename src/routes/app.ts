import { Router } from 'express';
import * as productController from '../controllers/product';
import * as authController from '../controllers/auth';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));
router.post('/login', authController.login);

router.get('/categories/:category_id/products', productController.getAll);
router.get('/categories/:category_id/products/:id', productController.getOne);

export default router;
