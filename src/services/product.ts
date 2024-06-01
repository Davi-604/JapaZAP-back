import { Prisma, PrismaClient } from '@prisma/client';
import * as categoryService from './category';

const prisma = new PrismaClient();

type filters = { category_id: number; id: number };

export const getAll = async (category_id: number) => {
    try {
        const category = await categoryService.getOne(category_id);
        if (!category) return;

        return await prisma.product.findMany({ where: { category_id } });
    } catch (err) {
        return false;
    }
};

export const getOne = async (filters: filters) => {
    try {
        const category = await categoryService.getOne(filters.category_id);
        if (!category) return;

        return await prisma.product.findFirst({ where: filters });
    } catch (err) {
        return false;
    }
};

type CreateProduct = Prisma.Args<typeof prisma.product, 'create'>['data'];
export const add = async (category_id: number, data: CreateProduct) => {
    try {
        const category = await categoryService.getOne(category_id);
        if (!category) return;

        return await prisma.product.create({ data });
    } catch (err) {
        console.log(err);
        return false;
    }
};

type UpdateProduct = Prisma.Args<typeof prisma.product, 'update'>['data'];
export const update = async (filters: filters, data: UpdateProduct) => {
    try {
        const category = await categoryService.getOne(filters.category_id);
        if (!category) return;

        return await prisma.product.update({ where: filters, data });
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const remove = async (filters: filters) => {
    try {
        const category = await categoryService.getOne(filters.category_id);
        if (!category) return;

        return await prisma.product.delete({ where: filters });
    } catch (err) {
        console.log(err);
        return false;
    }
};
