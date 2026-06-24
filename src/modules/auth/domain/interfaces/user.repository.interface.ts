import { User } from '../entities/user.entity';

export const IUserRepository = 'IUserRepository';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
}