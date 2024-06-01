import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.category.findMany();
    } catch (err) {
        return false;
    }
};

export const getOne = async (id: number) => {
    try {
        return await prisma.category.findFirst({ where: { id } });
    } catch (err) {
        return false;
    }
};

type CreateCategory = Prisma.Args<typeof prisma.category, 'create'>['data'];
export const add = async (data: CreateCategory) => {
    try {
        return await prisma.category.create({ data });
    } catch (err) {
        return false;
    }
};

type UpdateCategory = Prisma.Args<typeof prisma.category, 'update'>['data'];
export const update = async (id: number, data: UpdateCategory) => {
    try {
        return await prisma.category.update({ where: { id }, data });
    } catch (err) {
        return false;
    }
};

export const remove = async (id: number) => {
    try {
        return await prisma.category.delete({ where: { id } });
    } catch (err) {
        return false;
    }
};
