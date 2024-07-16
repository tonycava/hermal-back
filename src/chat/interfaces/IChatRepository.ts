import { AddChatDto } from "./dto/AddChatDto";
import { Chat } from "@/common/entities/Chat";
import { Group } from '@/common/entities/Group';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';
import { SearchableUser } from '@/chat/interfaces/SearchableUser';

export interface IChatStorageRepository {
  addChat(chat: AddChatDto): Promise<void>;
  getChats(groupId: string): Promise<Chat[]>;
  getGroups(userId: string): Promise<Group[]>;
  getGroupInfo(groupId: string): Promise<Group | null>;
  createGroup(group: AddGroupDto): Promise<Group>;
  searchUser(searchTerm: string): Promise<SearchableUser[]>;
  addUserToGroup(groupId: string, userId: string): Promise<void>;
}
