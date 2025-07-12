// Seu arquivo de rotas
import express from 'express';
import MongooseUserRepository from '../../../infrastructure/database/repositories/MongooseUserRepository.js';
import CreateUser from '../../../domain/use-cases/user/createUser.js';
import LoginUser from '../../../domain/use-cases/user/LoginUser.js'; // Importe o novo caso de uso
import UserController from '../../../infrastructure/http/controllers/UserController.js';
import {protect, authorize} from '../../../infrastructure/http/middleware/authMiddleware.js'; 

const router = express.Router();

const userRepo = new MongooseUserRepository();
const createUser = new CreateUser(userRepo);
const loginUser = new LoginUser(userRepo); // Crie a instância do LoginUser
const controller = new UserController(createUser, loginUser); // Injete no controller

router.post('/users', (req, res) => controller.register(req, res)); // Rota de registro
router.post('/login', (req, res) => controller.login(req, res)); // NOVA ROTA DE LOGIN
router.get('/admin/all-employees', protect, authorize('admin'), (req, res) =>{

    res.json({message: 'Bem-vindo, adminitrador! Aqui estão todos os colaboradores.'});
});


export default router;