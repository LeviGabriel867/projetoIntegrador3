
import UserModel from '../models/UserModel.js';
import User from '../../../domain/entities/User.js';

export default class MongooseUserRepository {
  async create(userData) {
    const userDocument = await UserModel.create(userData);
    return new User(userDocument._id, userDocument.name, userDocument.userName, userDocument.role, userDocument.email, userDocument.password);
  }

  async findByEmail(email) {
    const userDocument = await UserModel.findOne({ email: email });
    if (!userDocument) return null;
    // Passe todos os campos para o construtor
    return new User(userDocument._id, userDocument.name, userDocument.userName, userDocument.role, userDocument.email, userDocument.password);
  }

  async findByEmailWithPassword(email) {
    const userDocument = await UserModel.findOne({ email: email }).select('+password');
    if (!userDocument) return null;
    // Passe todos os campos para o construtor
    return new User(userDocument._id, userDocument.name, userDocument.userName, userDocument.role, userDocument.email, userDocument.password);
  }

  async findByUserName(userName) {
    const userDocument = await UserModel.findOne({ userName: userName });
    if (!userDocument) return null;
    return new User(userDocument._id, userDocument.name, userDocument.userName, userDocument.role, userDocument.email, userDocument.password);
  }
}