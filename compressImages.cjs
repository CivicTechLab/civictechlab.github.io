const fs = require('fs');
const process = require('process');
const path = require('path');
const glob = require('glob');

const dir = process.argv[2];

const input_path = path.join(dir, '**', '*.{png,jpg,jpeg}');

const sharp = require('sharp');

glob(input_path, function (err, files) {
  if (err != null) {
    throw err;
  }
  files.forEach(function (inputFile) {
    sharp(inputFile)
      .jpeg({ quality: 70, force: false })
      .png({ quality: 70, force: false })
      .toFile(path.join(path.basename(inputFile)), (err, info) => {
        if (err === null) {
          fs.unlink(inputFile, (err2) => {
            if (err2) throw err2;
            console.log('successfully compressed and deleted ' + inputFile);
          });
        } else {
          throw err;
        }
      });
  });
});
