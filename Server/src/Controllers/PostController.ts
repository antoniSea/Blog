import { Request, Response } from 'express';
import validate from "../Helpers/ValidatorHelper.js";
import { BaseController } from './BaseController.js';
import PostsRepository from "../Repositories/PostsRepository.js";
import paginatorHelper from "../Helpers/PaginatorHelper.js";

class PostController extends BaseController {
  constructor() {
    super(PostsRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const errors = validate(req.body, {
      title: "required|string",
      content: "required|string",
    });

    if (Object.keys(errors.error).length > 0) {
      return res.status(400).json({ errors });
    }

    await this.repository.create(req.body, req.user.id);

    return res.status(201).json({ message: "Post created successfully" });
  };

  async getAll(req: Request, res: Response): Promise<Response> {
    const posts = await paginatorHelper.paginate(req, "post", 10);

    return res.json(posts);
  };

}

export default new PostController();
