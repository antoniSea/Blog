import BaseRepository from "./BaseRepository.js";

export class PostRepository extends BaseRepository {
  constructor() {
    super('post');
  }

  override async create(data, userId) {
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
