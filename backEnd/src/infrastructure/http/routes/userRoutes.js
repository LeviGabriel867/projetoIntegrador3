import express from 'express';
import MongooseUserRepository from '../../../infrastructure/database/repositories/MongooseUserRepository.js';
import CreateUser from '../../../domain/use-cases/user/createUser.js';
import LoginUser from '../../../domain/use-cases/user/LoginUser.js'; 
import UserController from '../../../infrastructure/http/controllers/UserController.js';
import {protect, authorize} from '../../../infrastructure/http/middleware/authMiddleware.js'; 

const router = express.Router();

const userRepo = new MongooseUserRepository();
const createUser = new CreateUser(userRepo);
const loginUser = new LoginUser(userRepo); 
const controller = new UserController(createUser, loginUser); 

router.post('/users', (req, res) => controller.register(req, res)); 
router.post('/login', (req, res) => controller.login(req, res)); 
router.get('/admin/all-employees', protect, authorize('admin'), (req, res) =>{

    res.json({message: 'Bem-vindo, adminitrador! Aqui estão todos os colaboradores.'});
});


export default router;