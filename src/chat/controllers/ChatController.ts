import { Context } from 'hono';
import { Socket } from 'socket.io';
import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';
import { AddChatUseCase } from '@/chat/usecases/AddChatUseCase';
import { GetChatUseCase } from '@/chat/usecases/GetChatUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { WsEvent } from '@/common/Event';

const getChats = async (c: Context) => {
	const result = await GetChatUseCase(c.req.param('groupId'), ChatSqliteRepository());
	return c.json(result, result.status);
};

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await AddChatUseCase(data, ChatSqliteRepository());
	socket.to(data.groupId).emit(WsEvent.SEND_CHAT, data);
};


export default {
	getChats,
	onChat
};

