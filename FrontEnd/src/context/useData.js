import { createContext, useContext } from "react";

export const userData = createContext({
  userDetails: {
    user_id: 1,
    username: "prashant",
    email: "rubyprashant14@gmail.com",
  },
  setUser_Details: () => {},
  privateCapsules: {
    title: "Learning PHP",
    message: "lets learn php and get a proper fullstack job",
    opening_date: "2005-12-12 12:12:00",
    open_status: false,
    open_date: null,
  },
  setPrivateCapsules: (
    title,
    message,
    opening_date,
    open_status,
    open_date
  ) => {},
});

export default function useData() {
  return useContext(userData);
}

export const UserProvider = userData.Provider;
2;
