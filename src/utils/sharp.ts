import sharp from 'sharp';
import fs from 'fs/promises';

export const handleRawPhoto = async (originalPathName: string) => {
    sharp.cache(false);

    const image = await sharp(originalPathName)
        .resize({ width: 500, height: 300 })
        .toBuffer();

    await fs.unlink(originalPathName);

    return image;
};
