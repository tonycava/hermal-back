import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";
import { IChatStorageRepository } from "../interfaces/IChatRepository";
import { Chat } from "@/common/entities/Chat";
import { UuidDto } from '@/common/interfaces/dto/UuidDto';

type OnGetChatUseCase = Chat[];

export const OnGetChatUseCase = async (groupId: UuidDto, repository: IChatStorageRepository): Promise<UseCaseOutput<OnGetChatUseCase>> => {
	try {
		const chats = await repository.getChats(groupId);

    return {
      isSuccess: true,
      status: 200,
      data: chats
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


