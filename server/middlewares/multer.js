import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadFiles = multer({ storage }).fields([
  { name: 'photos', maxCount: 3 }, // your images
  { name: 'audio', maxCount: 1 },  // your voice note
]);
