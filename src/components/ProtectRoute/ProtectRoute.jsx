import React , {useContext} from 'react'
import { userContext } from '../../Context/TokenContext'
import Signin from '../Signin/Signin'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

if (localStorage.getItem("userToken") !== null) {
  return children;
} else {
  return <Navigate to="/signin" />;
}
}