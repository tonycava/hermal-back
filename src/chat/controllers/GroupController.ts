import { Socket } from 'socket.io';
import { JoinGroupDto } from '../interfaces/dto/JoinRoomDto';
import { Context } from 'hono';
import { JwtPayload } from '@/common/interfaces/JwtPayload';
import { GetGroupUseCase } from '@/chat/usecases/GetGroupUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { CreateGroupUseCase } from '@/chat/usecases/CreateGroupUseCase';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';
import { GetGroupInfoUseCase } from "@/chat/usecases/GetGroupeInfoUseCase";
import { AddUserToGroupUseCase } from "@/chat/usecases/AddUserToGroupUseCase";
import { AddUserToGroupDto } from "@/chat/interfaces/dto/AddUserToGroupDto";

const joinGroup = async (socket: Socket, data: JoinGroupDto) => {
	socket.join(data);
};

const getGroups = async (c: Context) => {
	const user = c.get('user') as JwtPayload;
	const result = await GetGroupUseCase(user.id, ChatSqliteRepository());
	return c.json(result, result.status);
};

const createGroup = async (c: Context) => {
	const body = await c.req.json<AddGroupDto>();
	const result = await CreateGroupUseCase(body, ChatSqliteRepository());
	return c.json(result, result.status);
}

const getGroupById = async (c: Context) => {
	const result = await GetGroupInfoUseCase(c.req.param('groupId'), ChatSqliteRepository());
	console.log(result);
	return c.json(result, result.status);
}

const addUsersToGroup = async (c: Context) => {
	const result = await AddUserToGroupUseCase({groupId: c.req.param('groupId'), userId: c.req.param('userId')}, ChatSqliteRepository());
	return c.json(result, result.status);
}

export default {
	joinGroup,
	getGroups,
	createGroup,
	getGroupById,
	addUsersToGroup
};
