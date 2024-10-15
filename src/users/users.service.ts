import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Cena',
      email: 'john.cena@outlook.com',
      role: 'INTERN'
    },
    {
      id: 2,
      name: 'Emanuel Ginóbili',
      email: 'ginobili@outlook.com',
      role: 'ENGINEER'
    },
    {
      id: 3,
      name: 'Laura Palmer',
      email: 'laura.palmer@live.com',
      role: 'ADMIN'
    },
    {
      id: 4,
      name: 'Ellen Ripley',
      email: 'ellen.ripley@mail.com',
      role: 'ADMIN'
    }
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) throw new NotFoundException('User not found');
    return foundUser;
  }

  create(user: CreateUserDto) {
    const createdUser = { id: Math.round(Math.random() * 10000 + 4), ...user };
    this.users.push(createdUser);
    return createdUser;
  }

  update(id: number, user: UpdateUserDto) {
    const foundUserIndex = this.users.findIndex((user) => user.id === id);
    this.users[foundUserIndex] = { ...this.users[foundUserIndex], ...user };
    return this.findOne(id);
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
