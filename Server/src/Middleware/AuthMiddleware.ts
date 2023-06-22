import { Request, Response, NextFunction } from 'express';
import usersRepository from '../Repositories/UsersRepository.js';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client'; // Import the Prisma types for your database

interface User extends Prisma.user {
    id: number;
    email: string;
    name: string;
    password: string;
    darkMode: boolean;
    createdAt: string;
    updatedAt: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

interface TokenResult {
  user: User
}

export default {
  loggedIn: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const result: TokenResult | null = await usersRepository.getToken(token);
      if (!result) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (decoded.exp > Date.now()) {
          return res.status(401).send({ error: 'Unauthorized' });
        }

        req.user = result.user;

        next();
      } catch (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Error occurred while fetching token' });
    }
  }
}
