import { Message } from './message';
import { User } from './user';

export interface Group {
  id: string;
  typeChatId: string;
  photo: string;
  chatName: string;
  createdAt: Date;
  // CreatedBy: string;
  updatedAt: Date;

  Users: User[];
  lastestMessage: string;
}
