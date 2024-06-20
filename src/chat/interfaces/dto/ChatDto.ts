import z from "zod"


export const chatDto = z.object({
	text: z.string()
})

export type ChatDto = z.infer<typeof chatDto>