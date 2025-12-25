import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
export const socket = io("http://localhost:8000");

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log('socket connected with: ', socket.id);
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};