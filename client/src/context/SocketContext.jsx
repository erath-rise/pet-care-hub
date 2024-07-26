import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const SOCKET_URL = "https://pet-care-hub.onrender.com";
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected");
        newSocket.emit("newUser", currentUser.id);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        // 这里可以添加用户通知逻辑
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};