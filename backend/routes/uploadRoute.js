import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) { // cb mean the call back that we want to call
    cb(null, '/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const checkFiletype = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(file.originalname.toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if ( extname && mimeType ) {
    return cb(null, true);
  }
  else {
    return cb('Invalid File');
  }
};

const upload = multer( {
  storage,
} );

router.post('/', upload.single('Image'), ( req, res ) => { // Image is for the field name here fieldname
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`,
  });
});

export default router;