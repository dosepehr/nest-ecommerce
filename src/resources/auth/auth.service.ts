import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { normalizeMobileNumber } from 'src/utils/funcs/normalizeMobileNumber';
import { hashPassword } from 'src/utils/funcs/password';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async register(data: RegisterDto) {
    const mobile = normalizeMobileNumber(data.mobile);
    const password = await hashPassword(data.password);
    if (mobile && password) {
      const newUser = this.userRepository.create({
        mobile,
        name: data.name,
        password,
      });
      this.userRepository.save(newUser);
      return {
        status: true,
        message: 'user created successfully',
      };
    }
    return {
      status: false,
      message: 'Something went wrong',
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
