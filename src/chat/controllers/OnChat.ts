import { Socket } from "socket.io";
import { OnChatUseCase } from "@/chat/usecases/OnChatUseCase";
import { AddChatDto } from "../interfaces/dto/AddChatDto";
import { ChatSqliteRepository } from "../repositories/ChatSqliteRepository";

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await OnChatUseCase(data, ChatSqliteRepository());
  socket.to(data.groupId).emit("message", data);
}
