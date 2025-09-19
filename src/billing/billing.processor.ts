import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PropertyService } from 'src/property/property.service';
import { RatesService } from 'src/rates/rates.service';
import { SubsidyContributionService } from 'src/subsidy-contribution/subsidy-contribution.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ReadingSessionService } from 'src/reading-session/reading-session.service';

@Processor('billing')
export class BillingProcessor {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly ratesService: RatesService,
    private readonly subsidyService: SubsidyContributionService,
    private readonly invoiceService: InvoiceService,
    private readonly readingSessionService: ReadingSessionService,
  ) {
    console.log('⚡ BillingProcessor inicializado');
  }

  @Process('generateByCycle')
  async handleBilling(
    job: Job<{ cycleId: string; year: number; month: number }>,
  ) {
    const { cycleId, year, month } = job.data;
    console.log(
      `🚀 Job ${job.id} START ciclo ${cycleId}, periodo ${month}/${year}`,
    );

    const session = await this.readingSessionService.findOne(year, month);

    if (!session) {
      console.log(`No existe ReadingSession para ${month}/${year}`);
      return false;
    }

    const properties = await this.propertyService.findByCycle(cycleId);
    const rates = await this.ratesService.findActiveRates();
    const subsidies = await this.subsidyService.findActiveSubsidies();

    try {
      for (const property of properties) {
        const stratum = property.stratum;

        const rate = rates.find((r) => r.stratum.id === stratum.id);

        for (const meter of property.meters) {
          const readings = meter.readings || [];
          if (readings.length < 2) continue;

          const prev = readings[readings.length - 2].evidence.value;
          const last = readings[readings.length - 1].evidence.value;
          const consumoTotal = last - prev;

          // Calcular consumo por bloques
          let valorConsumo = 0;
          if (consumoTotal <= 20) {
            valorConsumo = consumoTotal * Number(rate.basic);
          } else if (consumoTotal <= 40) {
            valorConsumo =
              20 * Number(rate.basic) +
              (consumoTotal - 20) * Number(rate.complementary);
          } else {
            valorConsumo =
              20 * Number(rate.basic) +
              20 * Number(rate.complementary) +
              (consumoTotal - 40) * Number(rate.sanctuary);
          }

          // Cargos fijos
          let total = valorConsumo + Number(rate.fixedCharge);
          const valueBeforeAdjustments = total;

          // Subsidios / Contribuciones
          const subsidy = subsidies.find(
            (s) => s.stratum.id === stratum.id && s.active,
          );
          if (subsidy) {
            if (subsidy.type === 'subsidio') {
              total = total - total * subsidy.value;
            } else if (subsidy.type === 'contribucion') {
              total = total + total * subsidy.value;
            }
          }

          const invoice = await this.invoiceService.createInvoice(
            meter,
            session,
            year,
            month,
            consumoTotal,
            valueBeforeAdjustments,
            total,
            Number(rate.fixedCharge),
          );

          console.log(`🧾 Factura creada: ${invoice.id}`);

          console.log(
            `💰 Factura guardada: Propiedad ${property.id}, Medidor ${meter.id}, Total: $${total.toFixed(
              2,
            )}`,
          );
        }
      }
    } catch (err) {
      console.error(`❌ Error en job ${job.id}`, err);
      throw err; // importante para que Bull marque el fallo
    }

    console.log(
      `✅ Job ${job.id} END ciclo ${cycleId}, periodo ${month}/${year}`,
    );
    return true; // 👉 asegúrate de retornar algo
  }
}
