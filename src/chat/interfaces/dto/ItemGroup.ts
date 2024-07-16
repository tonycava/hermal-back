import { Group } from '@/common/entities/Group';

export type ItemGroup = {
	lastChat: string;
} & Group;

export const MapPrismaToItemGroup = (groups: any[]): ItemGroup[] => {
	return groups.map((group) => {
		return {
			lastChat: group.Chat[0].content,
			name: group.name,
			id: group.id
		};
	});
};