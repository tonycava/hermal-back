import { AddChatDto } from "./dto/AddChatDto";

export interface IChatStorageRepository {
  addChat(chat: AddChatDto): Promise<void>
}
