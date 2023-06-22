var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userRepository from '../Repositories/UsersRepository.js';
import jwt from 'jsonwebtoken';
const requireToken = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.tryLogin(credentials);
    if (result.error) {
        throw new Error(result.error);
    }
    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    yield userRepository.createToken(result.id, token);
    return token;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.update(id, data);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userRepository.create(data);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
const toggleDarkMode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository.toggleDarkMode(id);
    return {
        success: true,
    };
});
export default {
    requireToken,
    updateUser,
    createUser,
    toggleDarkMode,
};
