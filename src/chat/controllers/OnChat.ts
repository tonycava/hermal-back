import { Socket } from "socket.io";
import { ChatDto } from "@/chat/interfaces/dto/ChatDto";
import { MessageAdapter } from "@/chat/repositories/MessageAdapter";
import { OnChatUseCase } from "@/chat/usecases/OnChatUseCase";

export const onChat = (socket: Socket, data: ChatDto) => {
	console.log("start OnChat")
	const result = OnChatUseCase(data, MessageAdapter());
	console.log("end OnChat")
}
