// use-cases/user/createUser.js

import bcrypt from 'bcryptjs'; // 1. Importar o bcrypt

export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { email, password } = userData;

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error('Já existe um usuário com este e-mail.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    return await this.userRepository.create({ email, password: hashedPassword });
  }
}