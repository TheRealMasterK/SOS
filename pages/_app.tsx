// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import StateContextProvider from "../context/StateContextProvider";
import IsRoomOpenedContextProvider from "../context/IsRoomOpenedContextProvider";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StateContextProvider>
      <IsRoomOpenedContextProvider>
        <Component {...pageProps} />
      </IsRoomOpenedContextProvider>
    </StateContextProvider>
  );
};

export default MyApp;
