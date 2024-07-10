import z from 'zod';

export const addGroupDto = z.object({
	name: z.string(),
	users: z.array(z.string()),
});

export type AddGroupDto = z.infer<typeof addGroupDto>;
