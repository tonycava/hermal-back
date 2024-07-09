import { Server } from "socket.io";
import { onChat } from "@/chat/controllers/OnChat";
import { WsEvent } from "@/common/Event";
import { WsMiddleware } from "./common/middleware";
import { addChatDto } from "./chat/interfaces/dto/AddChatDto";
import { joinGroupDto } from "./chat/interfaces/dto/JoinRoomDto";
import { onJoinRoom } from "./chat/controllers/OnJoinRoom";

const io = new Server({
	cors: { origin: "*", }
});

io.on(WsEvent.CONNECTION, (socket) => {

	socket.on(WsEvent.MESSAGE, (data) => WsMiddleware(socket, data, addChatDto) && onChat(socket, data));

	socket.on(WsEvent.JOIN_GROUP, (data) => WsMiddleware(socket, data, joinGroupDto) && onJoinRoom(socket, data));
  
});

io.listen(3001)
