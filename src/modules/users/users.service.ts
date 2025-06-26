import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    // Check user exist
    const existUser = await this.prisma.user.findFirst({
      where: { username: dto.username }
    })

    if (existUser) {
      throw new ConflictException('User exist');
    }

    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(dto.password, salt);

    const data = {
      username: dto.username,
      password: hashPwd,
      salt: salt,
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      role: Role.CUSTOMER,
    }

    const createUser = await this.prisma.user.create({
      data: data
    })

    return {
      createUser,
      message: "user created"
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username }
    })
  }

  findById(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
