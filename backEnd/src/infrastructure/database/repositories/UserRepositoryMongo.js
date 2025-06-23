// infrastructure/database/repositories/UserRepositoryMongo.js

import UserModel from '../models/UserModel.js';
import User from '../../../domain/entities/User.js';

export default class UserRepositoryMongo {
  async create(userData) {
    const userDocument = await UserModel.create(userData);
    return new User(userDocument._id, userDocument.email, userDocument.password);
  }

  async findByEmail(email) {
    const userDocument = await UserModel.findOne({ email: email });
    if (!userDocument) return null;
    return new User(userDocument._id, userDocument.email, userDocument.password);
  }

  // NOVO MÉTODO: Busca o usuário e força a inclusão da senha
  async findByEmailWithPassword(email) {
    // Usamos .select('+password') para trazer a senha, que está oculta por padrão
    const userDocument = await UserModel.findOne({ email: email }).select('+password');
    if (!userDocument) return null;
    return new User(userDocument._id, userDocument.email, userDocument.password);
  }
}