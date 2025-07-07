import multer from 'multer';
import fs from "fs";
import { Request } from 'express';
import { VOLUME_PATH } from '../env.ts';

const storage = ((path: string) => {
  const fullPath = VOLUME_PATH + path;
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
})

const upload = (path: string) => multer({ storage: storage(path) });

export default upload;