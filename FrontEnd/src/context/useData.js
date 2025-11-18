import { createContext, useContext } from "react";

export const userData = createContext({
  userDetails: {
    user_id: 1,
    username: "prashant",
    email: "rubyprashant14@gmail.com",
  },
  setUser_Details: () => {},
});

export default function useData() {
  return useContext(userData);
}

export const UserProvider = userData.Provider;
2;
