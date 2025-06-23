import express from 'express';
import UserRepositoryMongo from '../../infrastructure/database/repositories/UserRepositoryMongo.js';
import CreateUser from '../../use-cases/user/createUser.js';
import UserController from '../controllers/UserController.js';

const router = express.Router();

const userRepo = new UserRepositoryMongo();
const createUser = new CreateUser(userRepo);
const controller = new UserController(createUser);

router.post('/users', (req, res) => controller.register(req, res));

export default router;
