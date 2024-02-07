import React, { createContext, useContext, useReducer } from "react";
import IsRoomOpenedReducers, { initialState } from "./IsRoomOpenedReducers";

export const IsRoomOpenedContext = createContext<any>(null);

type IsRoomOpenedContextProviderProps = {
  children: React.ReactNode;
};

const IsRoomOpenedContextProvider = ({
  children,
}: IsRoomOpenedContextProviderProps) => (
  <IsRoomOpenedContext.Provider
    value={useReducer(IsRoomOpenedReducers, initialState)}
  >
    {children}
  </IsRoomOpenedContext.Provider>
);

export const useRoomState = () => useContext(IsRoomOpenedContext);

export default IsRoomOpenedContextProvider;
