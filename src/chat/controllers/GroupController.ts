import { Socket } from "socket.io";
import { JoinGroupDto } from "../interfaces/dto/JoinRoomDto";

const joinGroup = async (socket: Socket, data: JoinGroupDto) => {
  socket.to(data).emit("message", data);
}

export default { joinGroup };