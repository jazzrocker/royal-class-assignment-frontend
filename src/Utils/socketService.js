import { io } from "socket.io-client";
import { SOCKET_URL } from "./Constants";
import { getLocalStorageItem } from "./Helper";

// Construct the socket URL properly - match test.html configuration
const serverUrl = SOCKET_URL || "http://localhost:4000";
const namespace = "/royalClassAuctionRoom";

const socket = io(serverUrl + namespace, {
  transports: ["websocket"],
  reconnection: true,
  auth: {
    token: getLocalStorageItem("token"),
  },
});

// Add connection event handlers like in test.html
socket.on("connect", () => {
  console.log("Connected to auction room server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from auction room server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});

const socketService = {
  emit: (event, data) => {
    socket.emit(event, data);
  },

  on: (event, callback) => {
    socket.on(event, callback);
  },

  off: (event) => {
    socket.off(event);
  },
  
  onAny: (callback) => {
    socket.onAny(callback);
  },

  offAny: (callback) => {
    socket.offAny(callback);
  },

  getSocket: () => socket,
  
  isConnected: () => socket.connected,
  
  disconnect: () => {
    socket.disconnect();
  },
  
  connect: () => {
    if (!socket.connected) {
      socket.connect();
    }
  },
};

export default socketService;
