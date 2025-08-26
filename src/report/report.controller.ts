import { Controller, Get, Param, Delete, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('report-reading-meters/:sessionId')
  async reportReadingMeters(
    @Res() res: Response,
    @Param('sessionId') sessionId: string,
  ) {
    // Crear workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    // Agregar cabeceras
    worksheet.columns = [
      { header: '#', key: 'id', width: 10 },
      { header: 'CODIGO', key: 'code', width: 40 },
      { header: 'NOMBRE USUARIO', key: 'nameUser', width: 20 },
      { header: 'LECTURA ANTERIOR', key: 'previousReading', width: 20 },
      { header: 'CONSUMO ANTERIOR', key: 'previousConsumption', width: 20 },
      { header: 'LECTURA ACTUAL', key: 'currentReading', width: 20 },
      { header: 'CONSUMO ACTUAL', key: 'currentConsumption', width: 20 },
    ];

    const data = await this.reportService.findAll(sessionId);

    data.forEach((item, index) => {
      worksheet.addRow({
        id: index + 1,
        code: item.meter.property.subscriber
          ? item.meter.property.subscriber.identification
          : '',
        nameUser: item.meter.property.tenant.fullName,
        previousReading: item.evidence ? item.evidence.value : 0,
        previousConsumption: 0,
        currentReading: item.evidence ? item.evidence.value : 0,
        currentConsumption: 0,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reporte-${sessionId}.xlsx`,
    );

    // Enviar el archivo como stream
    await workbook.xlsx.write(res);
    res.end();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
