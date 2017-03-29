import fs from 'fs';
import path from 'path';
import asyncBusboy from 'async-busboy';
import uuid from 'node-uuid';
import Boom from 'boom';

export default class File {
  /* upload files */
  static async upload (ctx) {
    const { files } = await asyncBusboy(ctx.req);
    await files.map((file) => {
      fs.readFile(file.path, (err, data) => {
        const fileName = uuid.v4();
        const destinationPath = path.join(__dirname, '..', '..', '/uploads/');
        const filePath = `${destinationPath}${fileName}.png`;
        fs.writeFile(filePath, data, (error) => {
          if (error !== null) throw Boom.notFound('Upload file error');
        });
      });
      return true;
    });
  }
  /* delete file */
  static async delete (filePath, fullPath = false) {
    let file = filePath;
    if (fullPath === true) {
      const destinationPath = path.join(__dirname, '..', '..', '/uploads/');
      file = `${destinationPath}${filePath}`;
    }
    if (file) {
      fs.stat(file, (err) => {
        if (err) {
          throw Boom.notFound('Delete file error');
        } else {
          fs.unlink(file, (error) => {
            if (error) throw Boom.notFound('Delete file error');
          });
        }
      });
    }
  }
  /* check if file exist */
  // static async exist (fileName) {
  //   const destinationPath = path.join(__dirname, '..', '..', '/uploads/');
  //   let fileExist;
  //   if (fileName) {
  //     const file = `${destinationPath}${fileName}`;
  //     await fs.stat(file, (err) => {
  //       if (err) {
  //         fileExist = false;
  //       } else {
  //         fileExist = true;
  //       }
  //     });
  //   }
  //   return fileExist;
  // }
  /* get full path to file by his name */
  static async path (fileName) {
    const destinationPath = path.join(__dirname, '..', '..', '/uploads/');
    const fullPath = `${destinationPath}${fileName}`;
    return fullPath;
  }

}
