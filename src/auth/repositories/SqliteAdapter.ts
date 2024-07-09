import prisma from "@/common/db";
import { IStorageRepository } from "@/auth/interfaces/IStorageRepository";

interface SqliteAdapter extends IStorageRepository {
}

export const SqliteAdapter = (): SqliteAdapter => {
	return {
		async addUser(user) {
			await prisma.user.create({ data: user })
		},
		getUserByEmail(email: string) {
			return prisma.user.findFirst({
				where: { email }
			})
		}
	}
}
