import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";
import { IChatStorageRepository } from "../interfaces/IChatRepository";
import { AddChatDto } from "../interfaces/dto/AddChatDto";

type OnChatUseCaseOutput = null;

export const OnChatUseCase = async (data: AddChatDto, repository: IChatStorageRepository): Promise<UseCaseOutput<OnChatUseCaseOutput>> => {
	try {
		await repository.addChat(data);

    return {
      isSuccess: true,
      status: 201,
      data: null
    }
	} catch (error) {
		console.log("OnChat Error", error);
		return {
			isSuccess: false,
			status: 500,
			message: "Something went wrong !"
		};
	}

}


