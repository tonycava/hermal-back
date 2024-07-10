import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";
import { IChatStorageRepository } from "../interfaces/IChatRepository";
import { AddChatDto } from "../interfaces/dto/AddChatDto";
import ChatSend from "@/chat/events/ChatSend";

type AddChatUseCaseOutput = null;

let sub = undefined;

export const AddChatUseCase = async (data: AddChatDto, repository: IChatStorageRepository): Promise<UseCaseOutput<AddChatUseCaseOutput>> => {
	sub ??= ChatSend.subscribe(async () => {
		 await repository.addChat(data);
	});

	try {
		ChatSend.emit(data);

    return {
      isSuccess: true,
      status: 201,
      data: null
    }
	} catch (error) {
		console.log("AddChat Error", error);
		return {
			isSuccess: false,
			status: 500,
			message: "Something went wrong !"
		};
	}

}

