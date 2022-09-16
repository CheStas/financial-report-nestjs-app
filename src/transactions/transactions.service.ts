import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';
import { Stream } from 'stream';
import * as csv from 'csv-parser';
import { Validator } from 'class-validator';
import { ClassTransformer } from 'class-transformer';
import { AsyncTransform } from 'src/utils/async-transform';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  private readonly validator = new Validator();
  private readonly transformer = new ClassTransformer();
  private asyncChunkTransform = new AsyncTransform(
    this.validateAndCreate.bind(this),
    this.logger,
  );

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async asyncCreateFromCsvStream(fileStream: Stream) {
    fileStream
      .pipe(csv({ skipLines: 0, separator: ',' }))
      .pipe(this.asyncChunkTransform);
  }

  async validateAndCreate(data: any) {
    this.logger.debug('new data validateAndCreate: ', data);
    const entity: any = this.transformer.plainToClassFromExist(
      CreateTransactionDto,
      data,
    );
    const errors = await this.validator.validate(entity);
    if (errors.length) {
      throw errors[0];
    }

    return this.create(entity);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<{ success: true }> {
    const transaction = new this.transactionModel({
      ...createTransactionDto,
      userId: 1,
    });
    await transaction.save();
    this.logger.debug('transaction saved');
    return { success: true };
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
