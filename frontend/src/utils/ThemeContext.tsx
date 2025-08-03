import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  availableCredit: number;
}

type ThemeContextType = {
  currUser: UserDataProps;
  handleUpdateCurrUser: (
    id: number,
    name: string,
    email: string,
    availableCredit:number
  ) => void;
  handleUpdateAvailableCredit: (availableCredit: number) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currUser: {
    id: 0,
    name: "Kane Cooper",
    email: "kanee44cooper@gmail.com",
    availableCredit: 88000000,
  },
  handleUpdateCurrUser: () => {},
  handleUpdateAvailableCredit: () => {},
});

export const useUserContext = () => useContext(ThemeContext);

export const UserContext = ({ children }: any) => {
  const [currUser, setCurrUser] = useState<UserDataProps>(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: 0,
          name: "Kane Cooper",
          email: "kanee44cooper@gmail.com",
          availableCredit: 880000,
        };
  });
  const handleUpdateCurrUser = (id: number, name: string, email: string,availableCredit:number) => {
    setCurrUser({
      id: id,
      name: name,
      email: email,
      availableCredit:availableCredit
    });
  };
  const handleUpdateAvailableCredit = (availableCredit: number) => {
    setCurrUser({
      ...currUser,
      availableCredit: availableCredit,
    });
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(currUser));
  }, [currUser]);
  return (
    <ThemeContext.Provider
      value={{ currUser, handleUpdateCurrUser, handleUpdateAvailableCredit }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
