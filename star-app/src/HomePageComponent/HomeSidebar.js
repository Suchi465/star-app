import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa';
import {Link,useLinkClickHandler} from 'react-router-dom';
import {HomeSidebardata} from './HomeSideData';
import {AiOutlineClose} from 'react-icons/ai';
import "../App.css";
import "./HomeSidebar.css";

const HomeSidebar=()=>
{
    const [menu,setMenu]=useState(false)
    const showMenu=()=>{
        setMenu(!menu)
    }
    return(
        <div>
         <div className="HomeSidebar">
             <Link to='#' className='menu-bars'>
                <FaBars onClick={showMenu}/>
             </Link>
             </div>
             <nav className={menu ?'nav-menu active':'nav-menu'}>
             <ul className='nav-menu-items' onClick={showMenu}>
                <li>
                     <Link to='#' className='menu-bars'>
                         <AiOutlineClose/>

                     </Link>
                 </li>
                 {HomeSidebardata.map((item,index)=>{
                     return (
                         <li key={index} className={item.className}>
                         <Link to={item.path}>
                             {item.icon}
                             <span>{item.title}</span>
                         </Link>
                         </li>
                     )
                 })}
                 </ul>
                 </nav>
            </div>
            );
}
export default HomeSidebar;