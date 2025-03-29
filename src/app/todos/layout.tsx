import React from "react";
import { AppContextProvider } from "../context/userContext";


const todoLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default todoLayout;
