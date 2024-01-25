import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState(undefined);

   const verifyAuth = async () => {
      const isLoggedIn = await axios.get(`/v2/auth/is_logged_in`);
      const isAllowed = localStorage.getItem('allowPrivate') == '201Created'
      // setAuth(isLoggedIn.data);
      // return isLoggedIn.data;
      setAuth(isAllowed);
      return isAllowed;
   };

   useEffect(() => {
      verifyAuth();
   }, []);

   return <AuthContext.Provider value={{ auth, verifyAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
