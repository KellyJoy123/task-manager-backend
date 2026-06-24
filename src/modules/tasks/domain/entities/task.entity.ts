export class Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(title: string, userId: string, description?: string) {
    this.title = title;
    this.userId = userId;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }

  updateDetails(title?: string, description?: string): void {
    if (title) this.title = title;
    if (description !== undefined) this.description = description;
    this.updatedAt = new Date();
  }

  toggleStatus(): void {
    this.completed = !this.completed;
    this.updatedAt = new Date();
  }
}