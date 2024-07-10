import { AddChatDto } from "./dto/AddChatDto";
import { Chat } from "@/common/entities/Chat";
import { Group } from '@/common/entities/Group';

export interface IChatStorageRepository {
  addChat(chat: AddChatDto): Promise<void>;
  getChats(groupId: string): Promise<Chat[]>;
  getGroups(userId: string): Promise<Group[]>;
}
