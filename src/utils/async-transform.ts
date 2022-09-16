import { Logger } from '@nestjs/common';
import { Transform } from 'node:stream';

export class AsyncTransform extends Transform {
  constructor(
    private processChunk: (data: any) => Promise<void>,
    private logger: Logger,
  ) {
    super({ objectMode: true });
  }

  public async _transform(chunk, encoding, cb) {
    try {
      await this.processChunk(chunk);
    } catch (e) {
      this.logger.error('ProcessChunk Error', e);
    }
    cb();
  }
}
