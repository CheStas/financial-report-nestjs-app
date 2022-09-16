import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017'),
    TransactionsModule,
    ReportsModule,
  ],
})
export class AppModule {}
