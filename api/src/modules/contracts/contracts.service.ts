import { ConflictException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractRepository } from 'src/shared/database/repositories/contract.repositories';

@Injectable()
export class ContractsService {
  constructor(private readonly contractsRepo: ContractRepository) {}

  async create(createContractDto: CreateContractDto) {
    const contract = await this.contractsRepo.findUnique({
      where: { name: createContractDto.name },
    });

    if (contract) {
      throw new ConflictException('Contrato já existe');
    }
    return this.contractsRepo.create({ data: createContractDto });
  }

  findAll() {
    return this.contractsRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
