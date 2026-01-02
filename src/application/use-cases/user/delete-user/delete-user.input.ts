import { UserId } from "src/domain/value-objects/UserId";

export interface DeleteUserInput {
  requesterId: UserId;
  targetUserId: UserId;
}
