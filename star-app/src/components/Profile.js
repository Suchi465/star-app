import axios from "axios";
import React, { useState } from "react"
// import 'font-awesome/css/font-awesome.min.css';

import Cookies from 'universal-cookie';
import UserImage from "./UserImage";
import './profile.css'
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2"
import Sidebar3 from "./Sidebar3";


function Profile()

{
   const cookies=new Cookies();
       
    return (
    <div>
         
         {cookies.get('role')==="Admin" && <Sidebar/>}
         {cookies.get('role')==='Developer' && <Sidebar2/>} 
         {cookies.get('role')==='Lead' && <Sidebar3/>}
        
        <UserImage />
        
        <h3 className="heading">Hello, {cookies.get('username') }</h3>

        <table class="profileTable">
            <tr class="top-row"> 
                <td className="td2"> User ID </td>
                <td className="td2"> {cookies.get('id')}</td>
 
            </tr>
            <tr>
                <td className="td2">Username</td>
                <td className="td2">{cookies.get('username')}</td>
            </tr>
            <tr>
                <td className="td2">Role </td>
                <td className="td2"> {cookies.get('role')}</td>
            </tr>

            <tr>
                <td className="td2">Status</td>
                <td className="td2"> {cookies.get('status')}</td>
            </tr>

            
        </table>
    </div>
    
        
        
        
        
    )
}
export default Profile;