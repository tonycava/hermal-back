import { AddUserDto } from "@/auth/interfaces/dto/AddUserDto";
import { User } from "@/common/entities/User"

export interface IStorageRepository {
	addUser(user: AddUserDto): Promise<void>
	getUserByEmail(email: string): Promise<User | null>
}