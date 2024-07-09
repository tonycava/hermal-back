import { Socket } from "socket.io";
import { JoinGroupDto } from "../interfaces/dto/JoinRoomDto";

export const onJoinRoom = async (socket: Socket, data: JoinGroupDto) => {
  socket.to(data).emit("message", data);
}
