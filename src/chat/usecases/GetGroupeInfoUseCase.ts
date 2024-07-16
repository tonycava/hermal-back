import { UseCaseOutput } from '@/common/interfaces/UseCaseOutput';
import { IChatStorageRepository } from '../interfaces/IChatRepository';
import { Group } from '@/common/entities/Group';

type OnGetGroupUseCaseOutput = Group;


export const GetGroupInfoUseCase = async (groupId: string, repository: IChatStorageRepository): Promise<UseCaseOutput<OnGetGroupUseCaseOutput>> => {
    try {
        const group = await repository.getGroupInfo(groupId);
        return {
            isSuccess: true,
            status: 201,
            data: group
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


