import { RequestHandler } from 'express';
import * as CategoryService from '../services/category';
import * as CategorySchema from '../schemas/category';
import z from 'zod';

export const getAll: RequestHandler = async (req, res) => {
    const categories = await CategoryService.getAll();
    if (categories) {
        return res.json({ categories });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const category = await CategoryService.getOne(parseInt(id));
    if (category) {
        return res.json({ category });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const add: RequestHandler = async (req, res) => {
    const body = CategorySchema.newCategorySchema.safeParse(req.body);

    if (body.success) {
        const newCategory = await CategoryService.add(body.data);
        if (newCategory) {
            return res.status(201).json({ newCategory });
        }
    } else {
        return res.status(403).json({ error: 'Dados inválidos ou incompletos' });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const update: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const body = CategorySchema.updateSchema.safeParse(req.body);

    if (body.success) {
        const updatedCategory = await CategoryService.update(parseInt(id), body.data);
        if (updatedCategory) {
            return res.status(201).json({ updatedCategory });
        }
    } else {
        return res.status(403).json({ error: 'Dados inválidos.' });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};

export const remove: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deletedCategory = await CategoryService.remove(parseInt(id));
    if (deletedCategory) {
        return res.json({ deletedCategory: deletedCategory.id });
    }

    res.status(500).json({ error: 'Ocorreu um erro...' });
};
