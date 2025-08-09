import "./App.css";
import { Toaster } from "react-hot-toast";
import { Layout } from "./Layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserdata } from "./Redux/Action";
import socketService from "./Utils/socketService";
import { notificationToast } from "./Utils/Helper";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.Login?.isAuthenticated);
  const userData = useSelector((state) => state?.Login?.userData);
  // const activeAuctions = userData?.activeAuctions;

  const fetchUserData = () => {
    if (isAuthenticated) {
      dispatch(getUserdata());
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isAuthenticated]);

  useEffect(() => {
    const logAllSocketEvents = (event, ...args) => {
      console.log(`🛰️ Socket Event Received: ${event}`, ...args);
    };

    socketService.onAny(logAllSocketEvents);
    socketService.on('global:notification',(data)=>{
      notificationToast(data?.notification);
    })
    socketService.on('auctionEnd',(data)=>{
      notificationToast(data?.notification);
    })
    return () => {
      socketService.offAny(logAllSocketEvents);
      socketService.off('global:notification');
      socketService.off('auctionEnd');
    };
  }, []);

  return (
    <>
      <Layout />
      <Toaster />
    </>
  );
}

export default App;
