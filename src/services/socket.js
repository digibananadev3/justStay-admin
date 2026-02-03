import { io } from "socket.io-client";
import { AUTH_BASE_URL } from "./auth";

export const socket = io(AUTH_BASE_URL, {
  transports: ["websocket"],
});
