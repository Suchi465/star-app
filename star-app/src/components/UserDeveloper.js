import axios from "axios";
import React,{useState,useEffect, useMemo} from "react";
import Sidebar2 from "./Sidebar2";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Cookies from "universal-cookie";


function UserDeveloper()
{
    const cookie=new Cookies();

    const [data,setData]=useState([]);
    
   
    
    useEffect(()=>{

         const loadFun=async()=>{
            

                const res=await axios({
                    method:"get",
                    url:"http://localhost:8080/getAll",
             })

            setData(res.data);
           
        
             
            };
            loadFun(); 
            },[]);

   return ( 
       <div>
             <Sidebar2 />
             <h1 style={{textAlign:"center"}}> Users Table</h1>

          <Table value={data} />           

       </div>
         
           
           
       
   )
}

export default UserDeveloper;