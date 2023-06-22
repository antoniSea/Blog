import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class BaseRepository {
  private readonly model: string;
  public prisma: PrismaClient;
  public modelDelegate: any;

  constructor(model: string) {
    this.prisma = prisma;
    this.model = model;

    this.modelDelegate = this.prisma[this.model] as any;
  }

  async create(data: any) {
    return await this.modelDelegate.create({
        data: data,
    });
  }

  async getAll() {
    return await this.modelDelegate.findMany();
  }

  async getById(id: number | string) {
    return await this.modelDelegate.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });
  }

  async update(id: number | string, data: any) {
    return await this.modelDelegate.update({
      where: {
        id: parseInt(id as string, 10),
      },
      data,
    });
  }

  async delete(id: number | string) {
    return await this.modelDelegate.delete({
      where: {
        id: parseInt(id as string, 10),
      },
    });
  }
}
