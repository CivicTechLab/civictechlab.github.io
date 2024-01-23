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
  files.forEach(async function (inputFile) {
    let buffer = await sharp(inputFile)
      .jpeg({ quality: 70, force: false })
      .png({ quality: 70, force: false })
      .webp({ quality: 70, force: false })
      .toBuffer();

    sharp(buffer).toFile(path.join(inputFile), (err, info) => {
      if (err === null) {
        console.log('Successfully compressed ' + inputFile);
      } else {
        throw err;
      }
    });
  });
});
