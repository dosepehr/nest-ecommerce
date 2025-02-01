import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/utils/interfaces/Message.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(data: CreateUserDto): Message {
    const newUser = this.userRepository.create(data);
    this.userRepository.save(newUser);
    return {
      status: true,
      message: 'user created successfully',
    };
  }

  async findAll(): Promise<Message<User[]>> {
    const users = await this.userRepository.find();
    return {
      status: true,
      message: 'success',
      count: users.length,
      data: users,
    };
  }

  async findOne(id: number): Promise<Message<User>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    return {
      status: true,
      data: user,
    };
  }

  async update(id: number, data: UpdateUserDto): Promise<Message> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    await this.userRepository.update(id, data);
    return {
      message: 'User data edited',
      status: true,
    };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    await this.userRepository.delete(id);
    return {
      message: 'User data deleted',
      status: true,
    };
  }
  async softDelete(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    await this.userRepository.update(id, {
      deletedAt: new Date(),
    });
    return {
      message: 'User soft deleted',
      status: true,
    };
  }
}
