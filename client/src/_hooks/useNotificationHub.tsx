import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { INotification } from "interfaces";
import { useEffect, useState } from "react";
import { useAuthUser } from "./useAuthUser";
import { useDispatch } from "react-redux";
import { notificationLoadingSuccess, notificationUpdatingSuccess } from "_redux/slices/notificationSlice";

export default function useNotificationHub(){
    const { user } = useAuthUser();
    const dispatch = useDispatch();
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
    
    useEffect(() => {
        if (user) {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/events?username=" + user?.userName, {
                    accessTokenFactory: () => user?.token as string
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
    
        
            connection
                .start()
                .catch((error) => console.log("Error establishing the connection: ", error));
    
            connection.on("LoadNotifications", (loadedNotifications: INotification[]) => {
                dispatch(notificationLoadingSuccess(loadedNotifications))
            });

            connection.on("ReceiveNotification", (newNotification: INotification) => {
                dispatch(notificationUpdatingSuccess(newNotification))
            });
    
            // Reconnection events (optional, for logging/debugging)
            connection.onreconnecting(error => console.log("Reconnecting...", error));
            connection.onreconnected(connectionId => console.log("Reconnected with connectionId: ", connectionId));
            connection.onclose(error => console.log("Connection closed", error));
    
            setHubConnection(connection);
    
            return () => {
                connection.stop().catch(error => console.log("Error stopping connection: ", error));
            };
        }
    }, [dispatch, user]); 
    
    return {
        hubConnection, 
    };
}
