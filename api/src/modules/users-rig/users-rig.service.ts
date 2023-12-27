import { Injectable } from '@nestjs/common';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { CreateManyDto } from './dto/create-many-dto';

@Injectable()
export class UsersRigService {
  constructor(private readonly usersRigRepo: UsersRigRepository) {}
  async createMany(createManyDto: CreateManyDto) {
    const { userId, rigs } = createManyDto;

    await this.usersRigRepo.deleteMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });

    const data = rigs.map((rigId) => ({ userId, rigId }));

    return await this.usersRigRepo.createMany({
      data,
    });
  }

  /*   async remove(efficiencyId: string) {
    await this.usersRigRepo.delete({ where: { id: efficiencyId } });
    return null;
  } */
}
