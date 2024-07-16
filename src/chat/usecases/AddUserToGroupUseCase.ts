import { AddUserToGroupDto } from "@/chat/interfaces/dto/AddUserToGroupDto";
import { IChatStorageRepository } from "@/chat/interfaces/IChatRepository";
import { UseCaseOutput } from "@/common/interfaces/UseCaseOutput";

type AddUserToGroupUseCaseOutput = null;

export const AddUserToGroupUseCase = async (data: AddUserToGroupDto, repository: IChatStorageRepository): Promise<UseCaseOutput<AddUserToGroupUseCaseOutput>> => {
    try {
        await repository.addUserToGroup(data.groupId, data.userId);
        return {
            isSuccess: true,
            status: 201,
            data: null
        }
    } catch (error) {
        console.log("AddUserToGroup Error", error);
        return {
            isSuccess: false,
            status: 500,
            message: "Something went wrong !"
        };
    }

}