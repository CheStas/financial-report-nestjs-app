import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateTransactionDto } from './create-transaction.dto';
import { Transaction } from './transaction.schema';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadTransaction(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }

  @Post()
  createTransaction(
    @Body() transaction: CreateTransactionDto,
  ): Promise<{ success: true }> {
    return this.transactionService.create(transaction);
  }

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
