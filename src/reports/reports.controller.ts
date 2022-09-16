import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReportDto } from './report.dto';
import { ReportsService } from './reports.service';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOkResponse({
    type: ReportDto,
    isArray: true,
  })
  @Get()
  getReport(): Promise<any> {
    return this.reportsService.getReport();
  }
}
