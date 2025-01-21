import { Router } from 'express';
import * as productController from '../controllers/product';
import * as categoryController from '../controllers/category';
import * as authController from '../controllers/auth';
import { upload } from '../utils/multer';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));
router.post('/login', upload.none(), authController.login);

router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getOne);

router.get('/categories/:category_id/products', productController.getAll);
router.get('/categories/:category_id/products/:id', productController.getOne);

export default router;
