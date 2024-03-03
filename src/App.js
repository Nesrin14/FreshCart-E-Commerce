import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Notfound from './components/Notfound/Notfound';
import Cart from './components/Cart/Cart';
import UserContextProvider from './Context/TokenContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Productdetails from './components/Productdetails/Productdetails';
import CartContextProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import Wishlist from './components/Wishlist/Wishlist';
import WishListContextProvider from './Context/WishlistContext';
import OnlinePayment from './components/OnlinePayment/OnlinePayment';
import Allorders from './components/allorders/allorders';
import ForgotPass from './components/ForgotPass/ForgotPass';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPass from './components/ResetPass/ResetPass';
import Profile from './components/Profile/Profile';



 const router = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
  {path:'',element:<Signin/>},
  {path:'home',element:<ProtectRoute><Home/></ProtectRoute>},
  {path:'product',element:<ProtectRoute><Product/></ProtectRoute>},
  {path:'brand',element:<ProtectRoute><Brands/></ProtectRoute>},
  {path:'categories',element:<ProtectRoute><Categories/></ProtectRoute>},
  {path:'signin',element:<Signin/>},
  {path:'signup',element:<Signup/>},
  {path:'cart',element:<ProtectRoute><Cart/></ProtectRoute>},
  {path:'wishlist',element:<ProtectRoute><Wishlist/></ProtectRoute>},
  {path:'productdetails/:id',element:<ProtectRoute><Productdetails/></ProtectRoute>},
  {path:'onlinepayment' ,element:<ProtectRoute><OnlinePayment/></ProtectRoute>},
  {path:'allorders' ,element:<ProtectRoute><Allorders/></ProtectRoute>},
  {path:'forgotpassword' ,element:<ForgotPass/>},
  {path:'verify-code' ,element:<VerifyCode/>},
  {path:'reset-password' ,element:<ResetPass/>},
  {path:'*',element:<Notfound/>},
  ]}
])
function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
          <ToastContainer />
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}


export default App;
