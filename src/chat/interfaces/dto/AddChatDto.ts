import z from "zod"

export const addChatDto = z.object({
	content: z.string(),
  userId: z.string(),
  groupId: z.string()
})

export type AddChatDto = z.infer<typeof addChatDto>;
