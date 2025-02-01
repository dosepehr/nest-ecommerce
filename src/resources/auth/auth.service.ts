import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { normalizeMobileNumber } from 'src/utils/funcs/normalizeMobileNumber';
import { comparePassword, hashPassword } from 'src/utils/funcs/password';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(data: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [{ mobile: data.identifier }, { name: data.identifier }],
    });
    if (!user) {
      throw new NotFoundException('No user found with this identifier');
    }
    const passwordsMatch = await comparePassword(data.password, user.password);

    if (!passwordsMatch)
      throw new NotFoundException('No user found with this identifier');
    const token = this.jwtService.sign({ id: user.id });
    return { user, token };
  }
}
