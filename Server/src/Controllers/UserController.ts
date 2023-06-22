import { Request, Response } from 'express';
import validate from '../Helpers/ValidatorHelper.js';
import { BaseController } from './BaseController.js';
import userRepository from '../Repositories/UsersRepository.js';
import usersService from '../Services/users.service.js';

class UserController extends BaseController {
  constructor() {
    super(userRepository);
    this.requireToken = this.requireToken.bind(this);
    this.createUser = this.createUser.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  async requireToken(req: Request, res: Response): Promise<Response> {
    try {
      const token = await usersService.requireToken(req.body);
      return res.json({ token });
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  async createUser(req: Request, res: Response): Promise<Response> {
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6',
    };

    const errors = validate(req.body, rules);

    if (Object.keys(errors).length > 0) {
      return res.status(400).send(errors);
    }

    return await super.create(req, res);
  };

  async toggleDarkMode(req: Request, res: Response): Promise<Response> {
    const user = await usersService.toggleDarkMode(req.user.id);

    return res.json({ success: true, data: user });
  };

  getUser(req: Request, res: Response): Response {
    return res.json(req.user);
  }
}

export default new UserController();
