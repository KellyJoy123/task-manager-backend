import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  private toDomain(document: UserDocument): User {
    const user = new User(
      document.email,
      document.password,
      document.name,
    );
    user.id = document._id.toString();
    user.createdAt = document.createdAt;
    user.updatedAt = document.updatedAt;
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const document = await this.userModel.findOne({ email }).exec();
    if (!document) return null;
    return this.toDomain(document);
  }

  async create(user: User): Promise<User> {
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const document = new this.userModel({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      createdAt: user.createdAt,
    });

    const savedDocument = await document.save();
    return this.toDomain(savedDocument);
  }

  async exists(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email }).exec();
    return count > 0;
  }
}