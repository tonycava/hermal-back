import { Chat } from '@/common/entities/Chat';
import { ItemGroup } from '@/chat/interfaces/dto/ItemGroup';

export type ItemChat = {
	username: string;
} & Chat;

export const MapPrismaToItemChat = (chats: any[]): ItemChat[] => {
	return chats.map((chat) => {
		return {
			username: chat.user.username,
			userId: chat.user.id,
			id: chat.id,
			content: chat.content,
			groupId: chat.groupId
		};
	});
};
