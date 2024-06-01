import { RequestHandler } from 'express';
import * as ProductService from '../services/product';
import z from 'zod';

export const getAll: RequestHandler = async (req, res) => {
    const { category_id } = req.params;

    const products = await ProductService.getAll(parseInt(category_id));
    if (products) {
        return res.json({ products });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const getOne: RequestHandler = async (req, res) => {
    const { category_id, id } = req.params;

    const product = await ProductService.getOne({
        category_id: parseInt(category_id),
        id: parseInt(id),
    });
    if (product) {
        return res.json({ product });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const add: RequestHandler = async (req, res) => {
    const { category_id } = req.params;

    req.body.price = req.body.price.replace(',', '.');
    req.body.price = parseFloat(req.body.price);

    const newProductSchema = z.object({
        name: z.string(),
        price: z.number(),
        image: z.string(),
    });
    const body = newProductSchema.safeParse(req.body);

    if (body.success) {
        const newProduct = await ProductService.add(parseInt(category_id), {
            name: body.data.name,
            price: body.data.price,
            image: body.data.image,
            category_id: parseInt(category_id),
        });
        if (newProduct) {
            return res.json({ newProduct });
        }
    } else {
        return res.status(403).json({ error: 'Dados inválidos ou incompletos' });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const update: RequestHandler = async (req, res) => {
    const { category_id, id } = req.params;

    req.body.price = req.body.price.replace(',', '.');
    req.body.price = parseFloat(req.body.price);

    const updateProductSchema = z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        image: z.string().optional(),
    });
    const body = updateProductSchema.safeParse(req.body);

    if (body.success) {
        const updatedProduct = await ProductService.update(
            {
                category_id: parseInt(category_id),
                id: parseInt(id),
            },
            {
                name: body.data.name,
                price: body.data.price,
                image: body.data.image,
                category_id: parseInt(category_id),
            }
        );
        if (updatedProduct) {
            return res.json({ updatedProduct });
        }
    } else {
        return res.status(403).json({ error: 'Dados inválidos.' });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const remove: RequestHandler = async (req, res) => {
    const { category_id, id } = req.params;

    const deletedProduct = await ProductService.remove({
        category_id: parseInt(category_id),
        id: parseInt(id),
    });
    if (deletedProduct) {
        return res.json({ deletedProduct: deletedProduct.id });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};
