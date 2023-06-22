import BaseRepository from './BaseRepository.js';
import { PrismaClient } from '@prisma/client'

interface LoginData {
  email: string;
  password: string;
}

class UserRepository extends BaseRepository {
  public prisma: PrismaClient;

  constructor() {
    super('user');
    this.prisma = new PrismaClient();
  }

  async tryLogin(data: LoginData): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) {
      return {
        error: 'User not found',
      };
    }

    if (user.password !== data.password) {
      return {
        error: 'Password is incorrect',
      };
    }

    return user;
  }

  async createToken(userId: number, token: string) {
    return this.prisma.token.create({
      data: {
        token,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  };

  async getToken (token: string) {
    return this.prisma.token.findUnique({
      include: {
        user: true,
      },
      where: {
        token,
      },
    });
  };

  async toggleDarkMode(id: number) {
    const user = await this.getById(id);

    if (user) {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          darkMode: !user.darkMode,
        },
      });
    }
  };
}

export default new UserRepository();
