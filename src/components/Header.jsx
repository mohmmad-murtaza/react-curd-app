import { NavLink } from "react-router";
const Header = () =>{
    const menuList = [
        {
            name:"Home",
            url:"/"
        },
       {
        name:"Products",
        url:"/products"
       },
       {
        name:"Services",
        url:"/services"
       }
    ]
    return(
        <>
        <nav className="Navbar">
            <ul className="nav">{
                menuList.map((item,index)=>{
                    return(
                    <li className="nav" key={index}>
                        <NavLink to={item.url}>{item.name}</NavLink>
                    </li> 
                );
                })
            }
            </ul>
        </nav>
        </>
    );
}
export default Header;