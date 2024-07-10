import { Socket } from 'socket.io';
import { JoinGroupDto } from '../interfaces/dto/JoinRoomDto';
import { Context } from 'hono';
import { JwtPayload } from '@/common/interfaces/JwtPayload';
import { GetGroupUseCase } from '@/chat/usecases/GetGroupUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { CreateGroutUseCase } from '@/chat/usecases/CreateGroupUseCase';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';

const joinGroup = async (socket: Socket, data: JoinGroupDto) => {
	console.log(socket.data)
	console.log(data)
	socket.to(data).emit('message', data);
};

const getGroups = async (c: Context) => {
	const user = c.get('user') as JwtPayload;
	const result = await GetGroupUseCase(user.id, ChatSqliteRepository());
	return c.json(result, result.status);
};

const createGroup = async (c: Context) => {
	const body = await c.req.json<AddGroupDto>();
	const result = await CreateGroutUseCase(body, ChatSqliteRepository());
	return c.json(result, result.status);
}

export default {
	joinGroup,
	getGroups,
	createGroup,
};
