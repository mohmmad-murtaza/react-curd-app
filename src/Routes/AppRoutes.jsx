import { Route,Routes } from "react-router";
import { Home } from "../components/Home";
import  Products from "../Manage-Product-Post/Products";
import CreatePost from "../Manage-Product-Post/CreatePost";
import Services from "../components/Services";
import NotFound from "../NotFound";
export const AppRoutes = () =>{
    return(
        <Routes>
        <Route path='/' element={<Home/>}/>
    <Route path='/services' element ={<Services/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create-post/:id?' element={<CreatePost/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    )
} 