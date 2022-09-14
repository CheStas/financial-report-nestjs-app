import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<{ success: true }> {
    const transaction = new this.transactionModel({
      ...createTransactionDto,
      userId: 1,
    });
    await transaction.save();
    return { success: true };
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
