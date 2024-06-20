import { IChatRepository } from "@/chat/interfaces/IChatRepository";
import { ChatDto } from "@/chat/interfaces/dto/ChatDto";
import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";

type OnChatUseCaseOutput = any;

export const OnChatUseCase = async (data: ChatDto, repository: IChatRepository): Promise<UseCaseOutput<OnChatUseCaseOutput>> => {
	console.log("===OnChatUseCase===")
	console.log("data", data)
	console.log("repository", repository)

	return {
		status: 200,
		data: "test",
		isSuccess: true,
	}

}