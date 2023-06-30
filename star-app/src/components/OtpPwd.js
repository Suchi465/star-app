import React,{useState} from 'react'
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom'
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import {FaKey} from "react-icons/fa"
import 'react-notifications-component/dist/theme.css'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './OtpPwd.css'
export default function OtpPwd() {
   
    let navigate=useNavigate();
    const location=useLocation();
    const [newPwd,setnewPwd]=useState('');


    const handleChange=(e)=>{

      setnewPwd(e.target.value)
    }
  



     const checkOTP=(e)=>{
         
        const genOTP= location.state.value;
        const enteredOTP=e.target.value;
        console.log(genOTP)
        if(genOTP!=enteredOTP)    //incorrect OTP
        {
            Store.addNotification({
                title:"Incorrect OTP",
                message:"You've entered an incorrect OTP.Try again..",
                type:"info",
                container:"top-center",
                dismiss:{
                    duration:2000,
                    showIcon:true,
                    pauseOnHover:true,
                }
              
            })
        }
          
     }

    
    

     const storePwd=async(e)=>{
         e.preventDefault();   
         var formBodyData=new FormData();
        formBodyData.append('id',location.state.mail);
              formBodyData.append('newPwd',newPwd);

              const res2=await axios({
                  method:"put",
                  url:"http://localhost:8080/forgotPassword",
                  data:formBodyData,
                  headers:{"Content-Type":"multipart/form-data"}
              })

              if(res2.data)
              {
                  
             Store.addNotification({
                 title:"Success",
                 message:"Password Changed successfully",
                 type:"success",
                 container:"top-center",
                 dismiss:{
                     duration:2000,
                     showIcon:true,
                     pauseOnHover:true,
                 }
               
             })

             setTimeout(()=>{
                 navigate("/login")
             },3000)
              }
         
            
        
     }

  return (

    <div>
        <ReactNotifications />


        {/* <FontAwesomeIcon icon="envelope"/> */}
        
   <div style={{fontSize:"6rem"}} className="customEnv">
   <i class="fa fa-envelope-open  "></i>
   </div>
   <p class="msgPara"> OTP has been  sent to <span style={{fontWeight:"bold"}}> {location.state.mail}</span> </p>


         
        <form onSubmit={storePwd} className="formControl">
              

             
                 
              <FaKey 
              size={20}
              className="keyOTP"
             />
                <input   class=" otpIp"  name="otp" type="password" placeholder='Enter your OTP' required onBlur={checkOTP} />
              
               <br />

               <FaKey 
              size={20}
              className="keyOTP"
             />
  
                <input   class=" otpIp" name="password" type="password" placeholder='Enter your Password'  onChange={handleChange} required/>

             <br/> 
   
 
            <button type='submit' class="otpBtn"> Change Password </button>
        </form>
    </div>

  )
}

