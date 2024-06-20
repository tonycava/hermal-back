import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";
import { IStorageRepository } from "@/auth/interfaces/IStorageRepository";
import { LoginDto } from "@/auth/interfaces/dto/LoginDto";
import bcrypt from "bcrypt"
import { signToken } from "@/common/Jwt";

type RegisterUseCaseOutput = string
export const LoginUseCase = async (body: LoginDto, repository: IStorageRepository): Promise<UseCaseOutput<RegisterUseCaseOutput>> => {
	try {
		const user = await repository.getUserByEmail(body.email);

		if (!user) {
			return {
				isSuccess: false,
				status: 400,
				message: "An error occurred, please try again later"
			};
		}

		const isPasswordValid = await bcrypt.compare(body.password, user.password);
		if (!isPasswordValid) {
			return {
				isSuccess: false,
				status: 400,
				message: "Invalid password"
			};
		}

		const token = signToken({ id: user.id });

		return {
			isSuccess: true,
			status: 200,
			data: token
		};


	} catch (error) {
		console.log(error);
		return {
			isSuccess: false,
			status: 500,
			message: "Something went wrong !"
		};
	}
}