import { UseCaseOutput } from '@/common/interfaces/UseCaseOutput';
import { IChatStorageRepository } from '@/chat/interfaces/IChatRepository';
import { AddGroupDto } from '@/chat/interfaces/dto/AddGroupDto';

type CreateGroupUseCaseOutput = { id: string; name: string };


export const CreateGroutUseCase = async (data: AddGroupDto, repository: IChatStorageRepository): Promise<UseCaseOutput<CreateGroupUseCaseOutput>> => {
	try {
		const group = await repository.createGroup(data);

		return {
			isSuccess: true,
			status: 201,
			data: {
				id: group.id,
				name: group.name,
			}
		};
	} catch (error) {
		console.log('OnCreateGroup Error', error);
		return {
			isSuccess: false,
			status: 500,
			message: 'Something went wrong !'
		};
	}

};


