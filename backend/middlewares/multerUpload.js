import multer from 'multer';

const storage = multer.memoryStorage();

export const MulterUpload = multer({
    storage: storage,
    limits: {
        filesize: 5 * 1024 * 1024
    }
})

