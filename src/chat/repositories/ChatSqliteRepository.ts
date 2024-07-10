import prisma from '@/common/db';
import { Chat } from '@/common/entities/Chat';
import { Group } from '@/common/entities/Group';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';
import { IChatStorageRepository } from '@/chat/interfaces/IChatRepository';
import { SearchableUser } from '@/chat/interfaces/SearchableUser';

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
		getChats(groupId: string): Promise<Chat[]> {
			return prisma.chat.findMany({
				where: { groupId }
			});
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
		getGroups(userId: string): Promise<Group[]> {
			return prisma.group.findMany({
				where: { users: { some: { id: userId } } }
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
		}
	};
};
