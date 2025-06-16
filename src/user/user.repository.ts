import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity'

@Injectable()
export class UserRepository extends Repository<User> {
  findAll(): User[] | PromiseLike<User[]> {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}