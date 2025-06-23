export default class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { name, email, role } = userData;

    if (!['garcom', 'cozinha', 'admin'].includes(role)) {
      throw new Error('Perfil inválido.');
    }

    return await this.userRepository.create({ name, email, role });
  }
}
