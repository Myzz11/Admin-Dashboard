"use client";

import { MockUserData, User } from "@/mock/UserData";
import React, { createContext, useContext, useState } from "react";

type MockDataContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const MockDataContext = createContext<MockDataContextType>({
  users: [] as User[],
  setUsers: () => {},
});

export const MockDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState(MockUserData);

  return (
    <MockDataContext.Provider value={{ users, setUsers }}>
      {children}
    </MockDataContext.Provider>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <MockDataProvider>{children}</MockDataProvider>;
};

export const useMockData = () => {
  const { users, setUsers } = useContext(MockDataContext);
  return [users, setUsers] as const;
};

export default Providers;
