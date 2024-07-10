import { Server } from "socket.io";
import { WsEvent } from "@/common/Event";
import { WsMiddleware } from "./common/middlewares/middleware";
import { addChatDto } from "./chat/interfaces/dto/AddChatDto";
import { joinGroupDto } from "./chat/interfaces/dto/JoinRoomDto";
import GroupController from "./chat/controllers/GroupController";
import ChatController from "@/chat/controllers/ChatController";

const io = new Server({
	cors: { origin: "*", }
});

io.on(WsEvent.CONNECTION, (socket) => {

	socket.on(WsEvent.MESSAGE, (data) => WsMiddleware(socket, data, addChatDto) && ChatController.onChat(socket, data));

	socket.on(WsEvent.JOIN_GROUP, (data) => WsMiddleware(socket, data, joinGroupDto) && GroupController.joinGroup(socket, data));
  
});

io.listen(3001)
