import { UseCaseOutput } from '@/common/interfaces/UseCaseOutput';
import { IChatStorageRepository } from '../interfaces/IChatRepository';
import { Group } from '@/common/entities/Group';

type OnGetGroupUseCaseOutput = Group[];


export const GetGroupUseCase = async (userId: string, repository: IChatStorageRepository): Promise<UseCaseOutput<OnGetGroupUseCaseOutput>> => {
	try {
		const groups = await repository.getGroups(userId);

		// @ts-ignore
		console.log(groups.at(0).Chat);
		return {
			isSuccess: true,
			status: 201,
			data: groups
		};
	} catch (error) {
		console.log('GetGroup Error', error);
		return {
			isSuccess: false,
			status: 500,
			message: 'Something went wrong !'
		};
	}

};


