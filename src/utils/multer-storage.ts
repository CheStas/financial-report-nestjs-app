import { PassThrough } from 'node:stream';

export class MulterStorageStream {
  _handleFile(req, file, cb) {
    const outStream = new PassThrough();
    file.stream.pipe(outStream);
    cb(null, { stream: outStream });
  }
}
