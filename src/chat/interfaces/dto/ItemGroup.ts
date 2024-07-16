import { Group } from '@/common/entities/Group';

export type ItemGroup = {
	lastChat: string;
} & Group;

export const MapPrismaToItemGroup = (groups: any[]): ItemGroup[] => {
	return groups.map(({ id, name, Chat }) => {
		const lastChat = Chat.length >= 1 ? Chat[0].content : '';
		return {
			lastChat,
			name,
			id
		};
	});
};