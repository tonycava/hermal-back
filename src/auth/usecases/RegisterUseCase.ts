import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";
import { RegisterDto } from "@/auth/interfaces/dto/RegisterDto";
import { IStorageRepository } from "@/auth/interfaces/IStorageRepository";
import bcrypt from "bcrypt";

type RegisterUseCaseOutput = null;

export const RegisterUseCase = async (body: RegisterDto, repository: IStorageRepository): Promise<UseCaseOutput<RegisterUseCaseOutput>> => {
	try {
		const user = await repository.getUserByEmail(body.email);

		if (user) {
			return {
				isSuccess: false,
				status: 400,
				message: "User already exists"
			};
		}

		await repository.addUser({ username: body.username, email: body.email, password: bcrypt.hashSync(body.password, 10) });
		return {
			isSuccess: true,
			status: 201,
			data: null
		};
	} catch (error) {
		console.log("Register Error", error);
		return {
			isSuccess: false,
			status: 500,
			message: "Something went wrong !"
		};
	}

}