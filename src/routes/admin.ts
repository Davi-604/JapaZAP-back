import { Router } from 'express';
import { authPrivate } from '../utils/authPrivate';
import * as categoryController from '../controllers/category';
import * as productController from '../controllers/product';
import { upload } from '../utils/multer';
import multer from 'multer';

const router = Router();

router.get('/ping', authPrivate, (req, res) => res.json({ pong: true }));

router.post('/categories', [authPrivate, upload.none()], categoryController.add);
router.put('/categories/:id', [authPrivate, upload.none()], categoryController.update);
router.delete('/categories/:id', [authPrivate, upload.none()], categoryController.remove);

router.post(
    '/categories/:category_id/products',
    [authPrivate, upload.single('image')],
    productController.add
);
router.put(
    '/categories/:category_id/products/:id',
    [authPrivate, upload.single('image')],
    productController.update
);
router.delete(
    '/categories/:category_id/products/:id',
    authPrivate,
    productController.remove
);

export default router;
