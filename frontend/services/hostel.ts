import { api } from "./api";
import type { Room } from "@/types";

export async function getRooms() {
  const { data } = await api.get<Room[]>("/rooms");
  return data;
}

export async function allocateRoom(roomId: string, studentId: string) {
  const { data } = await api.post<Room>(`/rooms/${roomId}/allocate`, { studentId });
  return data;
}
