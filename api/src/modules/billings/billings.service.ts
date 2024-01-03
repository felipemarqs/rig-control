import { Injectable } from '@nestjs/common';

import { BillingRepository } from 'src/shared/database/repositories/billing.repositories';

@Injectable()
export class BillingsService {
  constructor(private readonly billingRepo: BillingRepository) {}

  async findByRigId({
    rigId,
    startDate,
    endDate,
  }: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    return await this.billingRepo.findByRigId({
      rigId,
      startDate,
      endDate,
    });
  }

  async findAll({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    return await this.billingRepo.findAll({ startDate, endDate });
  }
}
