const config = require('config');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    const formatFileName = fileName.toLowerCase().split(' ').join('_');

    cb(null, formatFileName + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);

  if (
    ext === '.zip' ||
    file.mimetype === 'application/zip' ||
    file.mimetype === 'application/x-zip-compressed'
  ) {
    return cb(null, true);
  }

  return cb(new Error('only zip files'));
};

const limits = {
  fileSize: 512 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

app.get('/', (req, res) => {
  const folderPath = path.resolve(__dirname, 'public');
  const fileName = 'form.html';
  fs.readFile(path.join(folderPath, fileName), 'utf8', (error, data) => {
    res.send(data);
  });
});

app.post('/upload-file', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.message === 'only zip files') {
        return res.status(400).json({ error: err.message });
      }

      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'The file is too large' });
      }

      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: 'Upload file error:' + err.message });
      }

      return res.status(500).json({ error: 'Unexpected server error' });
    }

    res.send('the file was uploaded successfully');
  });
});

app.listen(config.port, () => {
  console.log(
    `Server listen port: ${config.port}, and run on http://localhost:${config.port}`
  );
});
