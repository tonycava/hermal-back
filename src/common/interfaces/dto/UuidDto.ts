import z from 'zod';


export const uuidDto = z.string().uuid();

export type UuidDto = z.infer<typeof uuidDto>;



