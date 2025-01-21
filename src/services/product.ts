import { Prisma, PrismaClient } from '@prisma/client';
import * as categoryService from './category';
import { uploadToS3 } from '../utils/upload_aws';
import { handleRawPhoto } from '../utils/sharp';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../utils/aws_config';
import { deleteFileFromS3 } from '../utils/delete_file_aws';

const prisma = new PrismaClient();

type filters = { category_id: number; id: number };

export const getAll = async (category_id: number) => {
    try {
        const category = await categoryService.getOne(category_id);
        if (!category) return;

        return await prisma.product.findMany({
            where: { category_id },
            orderBy: { id: 'asc' },
        });
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
export const add = async (category_id: number, data: CreateProduct, fileName: string) => {
    try {
        const category = await categoryService.getOne(category_id);
        if (!category) return;

        const imageUrl = await uploadToS3(fileName);
        if (!imageUrl) throw new Error('Falha ao fazer upload da imagem.');

        return await prisma.product.create({
            data: {
                ...data,
                image: imageUrl,
            },
        });
    } catch (err) {
        console.log(err);
        return false;
    }
};

type UpdateProduct = Prisma.Args<typeof prisma.product, 'update'>['data'];
export const update = async (
    filters: filters,
    data: UpdateProduct,
    fileName?: string
) => {
    try {
        const category = await categoryService.getOne(filters.category_id);
        if (!category) return;

        let imageUrl = null;
        if (fileName) {
            imageUrl = await uploadToS3(fileName);
        }

        return await prisma.product.update({
            where: filters,
            data: {
                ...data,
                image: imageUrl ? imageUrl : data.image,
            },
        });
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const remove = async (filters: filters) => {
    try {
        const category = await categoryService.getOne(filters.category_id);
        if (!category) return;

        const product = await prisma.product.findUnique({
            where: filters,
        });
        if (!product) return;

        deleteFileFromS3(product.image);

        return await prisma.product.delete({ where: filters });
    } catch (err) {
        console.log(err);
        return false;
    }
};
