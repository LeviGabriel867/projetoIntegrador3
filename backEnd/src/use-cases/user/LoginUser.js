// src/use-cases/user/LoginUser.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    // 1. Encontra o usuário no banco (incluindo a senha)
    const user = await this.userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new Error('Credenciais inválidas.'); // Mensagem genérica por segurança
    }

    // 2. Compara a senha enviada com o hash salvo no banco
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Credenciais inválidas.'); // Mesma mensagem genérica
    }

    // 3. Se as senhas baterem, gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Informações que irão dentro do token (payload)
      'SEU_SEGREDO_SUPER_SECRETO_AQUI',   // Chave secreta (MUITO IMPORTANTE!)
      { expiresIn: '8h' }                 // Tempo de expiração do token
    );

    // 4. Retorna o token
    return { token };
  }
}