import z from 'zod';
import { uuidDto } from "@/common/interfaces/dto/UuidDto";

export const addUserToGroupDto = z.object({
    groupId: uuidDto,
    userId: uuidDto
});

export type AddUserToGroupDto = z.infer<typeof addUserToGroupDto>;