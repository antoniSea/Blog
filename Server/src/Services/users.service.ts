import userRepository from '../Repositories/UsersRepository.js';
import jwt from 'jsonwebtoken';
import Credentials from "../Types/Auth/Credentials.js";
import UserData from "../Types/Auth/UserData.js";

const requireToken = async (credentials: Credentials): Promise<string> => {
  const result = await userRepository.tryLogin(credentials);

  if (result.error) {
    throw new Error(result.error);
  }

  const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  await userRepository.createToken(result.id, token);

  return token;
};


const updateUser = async (id: number, data: UserData): Promise<any> => {
  const user = await userRepository.update(id, data);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const createUser = async (data: UserData): Promise<void> => {
  try {
    await userRepository.create(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const toggleDarkMode = async (id: number): Promise<any> => {
  await userRepository.toggleDarkMode(id);

  return {
    success: true,
  };
};

export default {
  requireToken,
  updateUser,
  createUser,
  toggleDarkMode,
};
