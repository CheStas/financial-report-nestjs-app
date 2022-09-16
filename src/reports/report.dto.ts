import { ApiProperty } from '@nestjs/swagger';

class ReportDataProperty {
  @ApiProperty()
  date: string;

  @ApiProperty()
  total: number;
}

export class ReportDto {
  @ApiProperty()
  source: string;

  @ApiProperty({ type: ReportDataProperty, isArray: true })
  data: ReportDataProperty;
}
