import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sum: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
