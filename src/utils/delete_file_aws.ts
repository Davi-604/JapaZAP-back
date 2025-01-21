import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from './aws_config';

export const deleteFileFromS3 = async (url: string) => {
    const fileName = url.split('/').pop();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${fileName}`,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
};
