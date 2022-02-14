import { io } from "socket.io-client";

const SERVER_ENDPOINT = "http://localhost:8080/";

export const socket = io(SERVER_ENDPOINT);
