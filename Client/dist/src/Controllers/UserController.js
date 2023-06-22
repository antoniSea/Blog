var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    requireToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield usersService.requireToken(req.body);
                return res.json({ token });
            }
            catch (error) {
                return res.status(400).send(error);
            }
        });
    }
    ;
    createUser(req, res) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {
                name: 'required|string',
                email: 'required|email',
                password: 'required|string|min:6',
            };
            const errors = validate(req.body, rules);
            if (Object.keys(errors).length > 0) {
                return res.status(400).send(errors);
            }
            return yield _super.create.call(this, req, res);
        });
    }
    ;
    toggleDarkMode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersService.toggleDarkMode(req.user.id);
            return res.json({ success: true, data: user });
        });
    }
    ;
    getUser(req, res) {
        return res.json(req.user);
    }
}
export default new UserController();
