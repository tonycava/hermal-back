import { IChatRepository } from "@/chat/interfaces/IChatRepository";

interface MessageAdapter extends IChatRepository {
}

export const MessageAdapter = (): MessageAdapter => {
	return {
	}
}