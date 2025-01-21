import multer from 'multer';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => cb(null, allowedMimeTypes.includes(file.mimetype)),
});
