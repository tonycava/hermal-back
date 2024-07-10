import { Context } from 'hono';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { SearchUserUseCase } from '@/chat/usecases/SearchUserUseCase';


const searchUser = async (c: Context) => {
	const searchTerm = c.req.query('searchTerm');
	const result = await SearchUserUseCase(searchTerm, ChatSqliteRepository());
	return c.json(result, result.status);
};


export default {
	searchUser
};