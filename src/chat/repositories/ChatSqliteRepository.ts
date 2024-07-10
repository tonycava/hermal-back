import { IChatStorageRepository } from '../interfaces/IChatRepository';
import prisma from '@/common/db';
import { Chat } from '@/common/entities/Chat';
import { User } from '@prisma/client';
import { Group } from '@/common/entities/Group';

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
		}
	};
};
