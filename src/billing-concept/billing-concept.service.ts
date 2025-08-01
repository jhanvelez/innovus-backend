import { Injectable } from '@nestjs/common';
import { CreateBillingConceptDto } from './dto/create-billing-concept.dto';
import { UpdateBillingConceptDto } from './dto/update-billing-concept.dto';

@Injectable()
export class BillingConceptService {
  create(createBillingConceptDto: CreateBillingConceptDto) {
    return 'This action adds a new billingConcept';
  }

  findAll() {
    return `This action returns all billingConcept`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billingConcept`;
  }

  update(id: number, updateBillingConceptDto: UpdateBillingConceptDto) {
    return `This action updates a #${id} billingConcept`;
  }

  remove(id: number) {
    return `This action removes a #${id} billingConcept`;
  }
}
