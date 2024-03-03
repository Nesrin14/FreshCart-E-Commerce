import axios from "axios";
import { createContext } from "react";

export const forgotPassContext = createContext();
export default  function ForgotPassContextProvider({children}){
  function forgotPass(email) {
    const header = { token: localStorage.getItem('userToken') };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` ,
      {email : email },
    );
  }

  return (
    <forgotPassContext.Provider value={{forgotPass}}>
      {children}
    </forgotPassContext.Provider>
  )
}

