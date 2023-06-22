import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository.js";

const prisma = new PrismaClient();

export class PostRepository extends BaseRepository {
  constructor() {
    super('post');
  }

  async create(data, userId) {
    const dataWithAuthor = {
      ...data,
      author: {
        connect: {
          id: userId,
        },
      },
  };

    return super.create(dataWithAuthor);
  }
}

export default new PostRepository();
