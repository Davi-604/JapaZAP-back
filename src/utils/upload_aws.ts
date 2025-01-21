import s3 from './aws_config';
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import path from 'path';
import { handleRawPhoto } from './sharp';

export const uploadToS3 = async (pathName: string) => {
    try {
        const fileName = path.basename(pathName);

        const fileContent = await handleRawPhoto(pathName);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${fileName}`,
            Body: fileContent,
            ContentType: 'image/jpeg',
            ACL: 'public-read' as ObjectCannedACL,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    } catch (error) {
        console.error('Erro ao fazer upload para o S3:', error);
        throw new Error('Falha ao fazer upload da imagem.');
    }
};
