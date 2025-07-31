
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

    const payload = {
      id: user.id,
      name: user.name,
      userName: user.userName,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, 'SEU_SEGREDO_SUPER_SECRETO_AQUI', { expiresIn: '8h' });

    return { 
      token, 
      user: payload 
    };
  }
}