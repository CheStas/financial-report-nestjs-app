import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { Express } from 'express';
import { csvFileFilter } from 'src/utils/file-filter';
import { MulterStorageStream } from 'src/utils/multer-storage';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: new MulterStorageStream(),
      fileFilter: (req, file, cb) => {
        csvFileFilter(file, cb);
      },
    }),
  )
  @ApiOkResponse({
    description: `
      transactions are set asynchronously,
      no errors are returned here
    `,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Comma-separated values file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  asyncUploadTransactionFromFile(@UploadedFile() file: Express.Multer.File) {
    this.transactionService.asyncCreateFromCsvStream(file.stream);
    return { success: true };
  }
}
