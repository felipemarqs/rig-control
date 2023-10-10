import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    return await this.contractsRepo.findAll({
      select: {
        id: true,
        name: true,
        rigs: true,
      },
    });
  }

  async findRigs(contractId: string) {
    if (contractId === 'undefined') {
      throw new BadRequestException('Contrato inválido!');
    }
    const contract = await this.contractsRepo.findFirst({
      where: { id: contractId },
    });

    if (!contract) {
      throw new NotFoundException('Contrato não encontrado!');
    }

    const rigs = await this.contractsRepo.findRigs({
      select: { rigs: true },
      where: { id: contractId },
    });

    const [res] = rigs;
    console.log(res['rigs']);

    return res['rigs'];
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
