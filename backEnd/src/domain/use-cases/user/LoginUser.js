// use-cases/user/LoginUser.js (EXEMPLO)

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Credenciais inválidas.');
    }

    // Payload do token agora com mais informações
    const payload = {
      id: user.id,
      name: user.name,
      userName: user.userName,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, 'SEU_SEGREDO_SUPER_SECRETO_AQUI', { expiresIn: '8h' });

    // Retorna o token e também os dados do usuário para o frontend não precisar fazer outra chamada
    return { 
      token, 
      user: payload 
    };
  }
}