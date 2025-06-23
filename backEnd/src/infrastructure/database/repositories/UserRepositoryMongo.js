import UserModel from '../models/UserModel.js';
import User from '../../../domain/entities/User.js';

export default class UserRepositoryMongo {
  async create(userData) {
    const user = await UserModel.create(userData);
    return new User(user._id, user.name, user.email, user.role);
  }
}
