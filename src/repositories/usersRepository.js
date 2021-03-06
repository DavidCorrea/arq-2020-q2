const mongoose = require('../../conf/db');
const { applicant } = require('../models/roles');

const UserModel = mongoose.model('User', 
  new mongoose.Schema({
    name: String,
    email: { type: String, index: true },
    phoneNumber: String,
    entity: String,
    position: String,
    locality: String,
    role: { type: String, default: applicant },
  }
));

class UsersRepository {
  constructor() {}

  async create({ name, email, phoneNumber, entity, position, locality, role }) {
    return UserModel.create({ name, email, phoneNumber, entity, position, locality, role });
  }

  findAll() {
    return UserModel.find({}).lean();
  }

  async findByEmail(email) {
    return UserModel.findOne({ email }).lean().exec();
  }

  async count() {
    return await UserModel.countDocuments();
  }

  async hasRole(email, role) {
    return UserModel.exists({ email, role });
  }
}

const instance = new UsersRepository();
module.exports = instance;
