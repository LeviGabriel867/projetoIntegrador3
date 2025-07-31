
import bcrypt from 'bcryptjs';

export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, userName, role, email, password }) {
    if (!name || !userName || !email || !password) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
        throw new Error("Este e-mail já está em uso.");
    }

    const userNameExists = await this.userRepository.findByUserName(userName); 
    if (userNameExists) {
        throw new Error("Este nome de usuário já está em uso.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create({ name, userName, role, email, password: hashedPassword });
  }
}