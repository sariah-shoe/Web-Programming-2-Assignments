import fs from 'fs';
import zlib from 'zlib';

class lab03 {

  syncFileRead(fileName) {
    var data = fs.readFileSync(fileName);
    return(data.toString());
  }
    
  asyncFileRead(fileName, callback) {
    return(fs.readFile(fileName, 'utf-8', (err, data) => callback(data)));
  }

  compressFileStream(inFile, outFile) {
    var stream = fs.createReadStream(inFile)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(outFile));
    return(stream);
  }

  decompressFileStream(inFile, outFile) {
    var stream = fs.createReadStream(inFile)
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream(outFile));
    return(stream);
  }

  listDirectoryContents(dirName, callback) {
    fs.readdir(dirName, (err, files) => callback(files));
  }
}

export {lab03};
