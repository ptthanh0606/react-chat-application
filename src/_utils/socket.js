import { io } from "socket.io-client";
import { API_URL } from "../api";

export default io(API_URL);
