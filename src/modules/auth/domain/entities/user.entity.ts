export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(email: string, password: string, name: string) {
    this.id = '';
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date();
  }
}