import asyncBusboy from 'async-busboy';
import fs from 'fs';
import uuid from 'node-uuid';

const defaultPath = './../../uploads';

export default class Upload {
  static async load (ctx, path = defaultPath) {
    const { files } = await asyncBusboy(ctx.req);
    // Make some validation on the fields before upload to S3
    // if (checkFiles(fields)) {
      // console.log('Files :', files);
      // console.log('Fields :', fields);
      // files.map(uploadFilesToS3)
    // } else {
    //   return 'error';
    // }
    console.log(path);
    await files.map((file) => {
      fs.readFile(file.path, (err, data) => {
        let filename = uuid.v4();
        let localpath = '/upload/';
        let newPath = `${__dirname}${localpath}${filename}.png`;
        console.log('here');
        console.log(newPath);
        fs.writeFile(newPath, data, function(error) {
          console.log(error);
        });
      });
      return true;
    });
  }
}
