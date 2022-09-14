import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from './../transactions/transaction.schema';

interface Report {
  source: string;
  data: Array<{ date: string; total: number }>;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getReport(): Promise<Report[]> {
    return this.transactionModel
      .aggregate([
        {
          $group: {
            _id: {
              source: '$source',
              month: { $month: '$date' },
              year: { $year: '$date' },
            },
            total: { $sum: '$sum' },
          },
        },
        {
          $group: {
            _id: '$_id.source',
            data: {
              $push: {
                date: {
                  $concat: [
                    {
                      $cond: [
                        { $lte: ['$_id.month', 9] },
                        { $concat: ['0', { $toString: '$_id.month' }] },
                        { $toString: '$_id.month' },
                      ],
                    },
                    '+',
                    { $toString: '$_id.year' },
                  ],
                },
                total: '$total',
              },
            },
          },
        },
        {
          $addFields: { source: '$_id' },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .exec();
  }
}
