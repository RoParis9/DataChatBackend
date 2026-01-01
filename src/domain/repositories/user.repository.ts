import { User } from "../entities/user.entity";
import { Email } from "../value-objects/Email";
import { UserId } from "../value-objects/UserId";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  delete(user: User): Promise<void>
  updateUser(user: User): Promise<User>
}
