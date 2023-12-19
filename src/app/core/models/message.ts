export interface Message {
  id: number;
  type: string;
  chatId: string;
  content: string;
  senderId: string;
  path: string;
  senderName: string;
  senderPhoto: string;
  createdAt: Date;
}
