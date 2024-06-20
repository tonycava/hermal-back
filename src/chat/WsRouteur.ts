import { Server } from "socket.io";
import { onChat } from "@/chat/controllers/OnChat";
import { WsEvent } from "@/common/Event";

const io = new Server({
	cors: { origin: "*", }
});

io.on(WsEvent.CONNECTION, (socket) => {

	// Chat
	// socket.on(WsEvent.MESSAGE, (data) => WsMiddleware(socket, data, messageDto) && onMessage(socket, data));

	/* Testing */
	socket.on(WsEvent.MESSAGE, (data) => onChat(socket, data));
});

io.listen(3001);