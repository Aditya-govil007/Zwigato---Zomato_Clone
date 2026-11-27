import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAppData } from "./AppContext";
import { realtimeService } from "../main";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppData();

  // useState (not useRef) so that when the socket is created the context
  // value actually updates and all consumers re-render with the live socket.
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!isAuth) {
      setSocket((prev) => {
        prev?.disconnect();
        return null;
      });
      return;
    }

    const newSocket = io(realtimeService, {
      auth: {
        token: localStorage.getItem("token"),
      },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket Connected", newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket Disconnected, reason:", reason);
    });

    newSocket.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isAuth]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
