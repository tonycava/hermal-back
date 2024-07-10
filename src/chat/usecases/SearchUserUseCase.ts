import { UseCaseOutput } from '@/common/interfaces/UseCaseOutput';
import { IChatStorageRepository } from '@/chat/interfaces/IChatRepository';
import { SearchableUser } from '@/chat/interfaces/SearchableUser';

type SearchUserUseCaseOutput = SearchableUser[];

export const SearchUserUseCase = async (searchTerm: string | undefined, repository: IChatStorageRepository): Promise<UseCaseOutput<SearchUserUseCaseOutput>> => {
	try {
		if (!searchTerm) {
			return {
				isSuccess: true,
				status: 201,
				data: []
			};
		}

		const users = await repository.searchUser(searchTerm);

		return {
			isSuccess: true,
			status: 201,
			data: users
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


