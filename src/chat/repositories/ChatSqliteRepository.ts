import prisma from '@/common/db';
import { Chat } from '@/common/entities/Chat';
import { Group } from '@/common/entities/Group';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';
import { IChatStorageRepository } from '@/chat/interfaces/IChatRepository';
import { SearchableUser } from '@/chat/interfaces/SearchableUser';
import { MapPrismaToItemGroup } from '@/chat/interfaces/dto/ItemGroup';
import { ItemChat, MapPrismaToItemChat } from '@/chat/interfaces/dto/ItemChat';

interface IChatDbRepository extends IChatStorageRepository {
	isUserInGroup(userId: string, groupId: string): Promise<boolean>;
}

export const ChatSqliteRepository = (): IChatDbRepository => {
	return {
		async addChat({ content, userId, groupId }): Promise<void> {
			await prisma.chat.create({
				data: {
					content,
					userId,
					groupId
				}
			});
		},
		async getChats(groupId: string): Promise<ItemChat[]> {
			const chats =  await prisma.chat.findMany({
				where: { groupId },
				orderBy: { createdAt: 'asc' },
				include: { user: true }
			});

			return MapPrismaToItemChat(chats)
		},
		async isUserInGroup(userId: string, groupId: string): Promise<boolean> {
			const userInGroup = await prisma.group.findFirst({
				where: {
					id: groupId,
					users: {
						some: { id: userId },
					},
				},
			});

			return Boolean(userInGroup);
		},
		async getGroups(userId: string): Promise<Group[]> {
			const groups = await prisma.group.findMany({
				where: { users: { some: { id: userId } } },
				include: {
					Chat: {
						orderBy: {
							createdAt: 'desc'
						},
						take: 1
					}
				}
			});

			return MapPrismaToItemGroup(groups);
		},
		getGroupInfo(groupId: string): Promise<Group | null> {
			return prisma.group.findFirst({
				where: { id: groupId }
			});
		},
		async createGroup(group: AddGroupDto): Promise<Group> {
			return prisma.group.create({
				data: {
					name: group.name,
					users: {
						connect: group.users.map(id => ({ id }))
					}
				}
			});
		},
		async searchUser(searchTerm: string): Promise<SearchableUser[]> {
			return prisma.user.findMany({
				where: { username: { contains: searchTerm } },
				select: { id: true, username: true },
				take: 10,
			});
		},
		async addUserToGroup(groupId: string, userId: string): Promise<void> {
			await prisma.group.update({
				where: { id: groupId },
				data: {
					users: {
						connect: { id: userId }
					}
				}
			});
		}
	};
};
