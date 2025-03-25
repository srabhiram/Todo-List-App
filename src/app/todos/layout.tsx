import React from "react";
import ContextProvider from "../context/userContext";


const todoLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default todoLayout;
