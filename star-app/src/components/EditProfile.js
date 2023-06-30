import React, { useState } from "react";
import Cookies from "universal-cookie";
import {useForm} from "react-hook-form";
import axios from "axios";
import UserImage from "./UserImage";
import Sidebar from "./Sidebar";
import './Editprofile.css'
import Sidebar2 from "./Sidebar2";
import Sidebar3 from "./Sidebar3";
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import {useNavigate} from 'react-router-dom'

function Editprofile()
{

    let navigate=useNavigate();
    const cookie=new Cookies();
    const {register,handleSubmit,watch,formState:{errors}}=useForm();
    const [username,setUsername]=useState(cookie.get('username'))
    const [id,setID]=useState(cookie.get('id'));
    const [userexists,setUserExists]=useState(false);
     
    function  onChangeUsername(e)
    {
              setUsername(e.target.value);
    }

    function onChangeID(e)
    {
        setID(e.target.value);
    }

          const onSubmit=async (data)=>{
          
             
                
                    var bodyFormData=new FormData();
                     bodyFormData.append('email',id);                          //check mail exists in db
       
                   const res=  await  axios({
                    method:"post",
                     url:"http://localhost:8080/idexists",
                     data:bodyFormData,
                     headers:{"Content-Type":"multipart/form-data"},

                    })
                
                 
                
                  if(!res.data && !(id===cookie.get('id')))    //check if user is not in the db and the state has changed

                  {
                    var bodyFormData=new FormData();                   //update email in db 
                    bodyFormData.append('oldMail',cookie.get('id'));
                    bodyFormData.append('email',id);
        
                   await axios({
                        method:"put",
                        url:"http://localhost:8080/updateemail",
                        data:bodyFormData,
                        headers:{"Content-Type":"multipart/form-data"}
                    })
                  cookie.set('id' , id ,{path:"/"})              //update email in  cookie
                        
                  Store.addNotification({
                    title:"Success",
                    message:"User ID Updated Successfully",
                    type:"success",
                    container:"top-center",
                    dismiss:{
                        duration:2000,
                        showIcon:true,
                        pauseOnHover:true,

                    }
                  
                })

                  } 
                  
                  if(!(username===cookie.get('username')))
                  {
                    var bodyFormData=new FormData();                   //update email in db 
                    bodyFormData.append('mail',cookie.get('id'));
                    bodyFormData.append('username',username);
        
                   await axios({
                        method:"put",
                        url:"http://localhost:8080/updateusername",
                        data:bodyFormData,
                        headers:{"Content-Type":"multipart/form-data"}
                    })
                  cookie.set('username',username,{path:"/"})              //update email in  cookie
                 
                  Store.addNotification({
                    title:"Success",
                    message:"Username Changed successfully",
                    type:"success",
                    container:"top-center",
                    dismiss:{
                        duration:2000,
                        showIcon:true,
                        pauseOnHover:true,
                    }
                  
                })

                  }  
                  setTimeout(()=>{
                    navigate("/profile");
                  },3000)     
                  
    }
    
   
    return (
      <div>

        <ReactNotifications />
      <div className="EditProfile">

           {cookie.get('role')==="Admin" && <Sidebar/>}
          {cookie.get('role')==='Developer' && <Sidebar2/>} 
          {cookie.get('role')==='Lead' && <Sidebar3/>}
        
      <h2 style={{textAlign:" center"}}>Edit Profile</h2>
         
        <div class="editProfileOutside">
          <UserImage />
            <form  noValidate  class="formControl" onSubmit={handleSubmit(onSubmit)}> 
            <div className="editProfileInside1">

                  <label  class="editlbl1" >User ID</label>   <br />  
                  <input 
                  class="editIp1"  
                  type="email" 
                  defaultValue={cookie.get('id') }
                  {...register("email",{
                      required:true,
                      pattern:/^[a-z](\.?[a-z0-9]){3,}@incedoinc\.com$/
                  })} 
                  onChange={onChangeID}
                  />

                  {errors.email && errors.email.type==="required" && (
                    <span className="error5 "> User ID is required </span> 
                   )}
                  {errors.email&& errors.email.type==="pattern" &&(
                     <span className="error5 "> Invalid User ID </span>
                )}
                {userexists && <span className="error5"> User already exists</span> }
 
           </div>

            <div className="editProfileInside1">
                        <label class="editlbl1">Username</label>  <br />
                        <input  class="editIp1"type="text"   defaultValue={cookie.get('username')}
                        {...register("username",{
                            required:true,
                            minLength:5,
                            maxLength:15
                            
                        })}
                        onChange={onChangeUsername}
                        />  
                         {errors.email && errors.email.type==="required" && (
                            <span className="error5"> User ID is required </span>
                   )}
                    {errors.username &&errors.username.type==='minLength' && (
                    <span className="error5">Minimum 5 characters</span>
                     )}
                     {errors.username &&errors.username.type==='maxLength' && (
                    <span className="error5">Maxinum 15 characters</span>
                    )}


            </div> 

            <div className="editProfileInside1">
                    <label class="editlbl1"> Role  </label> <br />
                    <input class="editIp1" readOnly type="text"  defaultValue={cookie.get('role')} />
            </div>

            <div className="editProfileInside1">
                    <label class="editlbl1" >   Status   </label> <br />
                    <input  readOnly class="editIp1" type="text"  defaultValue={cookie.get('status')}/>

            </div>

            <button type="submit"  class="submitbtn1"> Save Changes </button> 
           

            </form>
           
        </div>
        </div>
      </div>

    )
}
export default Editprofile;
