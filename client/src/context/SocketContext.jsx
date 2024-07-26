import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket = null;

    const connectSocket = () => {
      if (currentUser) {
        const SOCKET_URL = "https://pet-care-hub.onrender.com";
        newSocket = io(SOCKET_URL, {
          withCredentials: true,
          transports: ['websocket', 'polling'], // 尝试先使用WebSocket
          reconnectionAttempts: 5, // 最多重试5次
          reconnectionDelay: 1000, // 每次重试间隔1秒
        });

        newSocket.on("connect", () => {
          console.log("Socket connected");
          newSocket.emit("newUser", currentUser.id);
        });

        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          // 这里可以添加用户通知逻辑
        });

        newSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          if (reason === "io server disconnect") {
            // 服务器断开连接，需要手动重连
            newSocket.connect();
          }
          // 否则，socket.io会自动尝试重连
        });

        setSocket(newSocket);
      }
    };

    connectSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [currentUser]);

  // 提供一个重新连接的方法
  const reconnect = () => {
    if (socket) {
      socket.disconnect();
      socket.connect();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, reconnect }}>
      {children}
    </SocketContext.Provider>
  );
};