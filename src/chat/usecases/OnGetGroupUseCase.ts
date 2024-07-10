import { UseCaseOutput } from '@/common/interfaces/UseCaseOutput';
import { IChatStorageRepository } from '../interfaces/IChatRepository';
import { Group } from '@/common/entities/Group';

type OnGetGroupUseCaseOutput = Group[];


export const OnGetGroupUseCase = async (userId: string, repository: IChatStorageRepository): Promise<UseCaseOutput<OnGetGroupUseCaseOutput>> => {
	try {
		const groups = await repository.getGroups(userId);
		return {
			isSuccess: true,
			status: 201,
			data: groups
		};
	} catch (error) {
		console.log('OnChat Error', error);
		return {
			isSuccess: false,
			status: 500,
			message: 'Something went wrong !'
		};
	}

};


