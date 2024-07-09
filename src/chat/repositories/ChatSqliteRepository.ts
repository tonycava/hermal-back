import { IChatStorageRepository } from "../interfaces/IChatRepository"
import prisma from "@/common/db"

interface IChatDbRepository extends IChatStorageRepository {
}

export const ChatSqliteRepository = (): IChatDbRepository => {
	return {
    async addChat(chat) {
      await prisma.chat.create({
        data: {
          content: chat.content,
          userId: chat.userId
        }
      });
    } 
	}
}
