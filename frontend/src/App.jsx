import React from 'react'
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import SearchBar from './components/SearchBar'
import Men from './pages/men'
import Women from './pages/women'
import Kid from  './pages/kid'
import Profile from "./pages/profile";
import AdminLogin from './admin/AdminLogin'
import AdminRoute from './admin/AdminRoute'
import AdminDashboard from './admin/AdminDashboard'
import AdminTable from './admin/AdminTable'
import ProtectedRoute from './components/ProtectedRoute'
  import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const isAdmin = useLocation().pathname.startsWith('/admin')
  return (
    <div className = 'w-full'>
     <ToastContainer/>
     {!isAdmin && <Navbar/>}
     <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/collection' element={<Collection/>} />
        <Route path =  '/men' element={<Men/>}/>
        <Route path =  '/kid' element={<Kid/>}/>
        <Route path = '/women' element = {<Women/>} />
         <Route path = '/about' element={<About/>} />
         <Route path = '/contact' element={<Contact/>} />
         <Route path = '/product/:productID' element={<Product/>} />
         <Route path = '/Login' element={<Login/>} />
         <Route element={<ProtectedRoute />}>
           <Route path = '/cart' element={<Cart/>} />
           <Route path = '/place-order' element={<PlaceOrder/>} />
           <Route path = '/Orders' element={<Orders/>} />
           <Route path="/profile" element={<Profile />} />
         </Route>
         <Route path="/admin/login" element={<AdminLogin />} />
         <Route element={<AdminRoute />}>
           <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/admin/:table" element={<AdminTable />} />
         </Route>
     



     </Routes>
     {!isAdmin && <Footer/>}
    </div>
  )
}

export default App
