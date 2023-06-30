import React,{useState,createContext}  from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {useForm} from "react-hook-form";
import {send} from "emailjs-com";
import {Link,useNavigate} from "react-router-dom"
import OtpPwd from "./OtpPwd";
import { BallTriangle, TailSpin, ThreeDots } from "react-loader-spinner";
import {FaEnvelope} from "react-icons/fa"
import {FaKey} from "react-icons/fa"
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './VerifyEmail.css'
import { Form } from "formik";



function  VerifyEmail()
{
    let navigate=useNavigate();

    const {register,handleSubmit,watch,formState:{errors}}=useForm();  //useForm for email field
    const [userexists,setUserExists]=useState(true);   //check if user exists on submit
     const [content,setContent]=useState({
         from_name:'hariharan@incedoinc.com',
         to_name:'',
         message:'',
         reply_to:'hariharan@incedoinc.com',     //format of the email
     })

     const[otp,setOTP]=useState("1");   //store OTP here
     const [isLoading,setLoading]=useState(false);
     const [data,setData]=useState(false);
     const [msg,setmsg]=useState('');

    //generates OTP

    const genOTP=(e)=>
    {
        let value=''
        
        for(let i=0;i<6;i++)    //get 6 digit OTP
        {
            value+=Math.floor(Math.random()*10);
        }
       
        return value;
    }

 
    
   

    const onSubmit=  async (data)=>{    //on submit first check user is existing..if not prompt him to sign up
 
       
        var bodyFormData=new FormData();
        bodyFormData.append('email',data.email); 
        
        const existsdata= await  axios({                          //returns false if user does not exist
            method:"post",
            url:"http://localhost:8080/idexists",
            data:bodyFormData,
            headers:{"Content-Type":"multipart/form-data"},

        })
         setUserExists(existsdata.data);

        if(!existsdata.data)
        {
            Store.addNotification({
                title:"New User",
                message:"User ID not  registered!  Sign Up",
                type:"warning",
                container:"top-right",
                dismiss:{
                    duration:2000,
                    showIcon:true,
                    pauseOnHover:true,
                }
              
            })
        }

      let value=genOTP();
    
     
    
      if(existsdata.data)
      {
          setLoading(true);
      }
     let data1=new FormData();
     data1.append('email',data.email);
     data1.append('subject',"STAR App Password Reset");
     data1.append('message', "Use "+value+" to reset the password.If you didn't request this,you can ignore this mail")
  
     const res= existsdata.data && await axios({
         method:"post",
         url:"http://localhost:8080/sendOTP",
         data:data1,
         headers:{
             "Content-Type":"multipart/form-data"
         }

     })

     console.log(res);
      
       
      //then send otp to user ID
    

    // const res=  existsdata.data && await send(
    //     'service_dhg8wfl',  //service ID
    //     'template_bj6rwem',  //Template ID
    //      params,
    //     'c_F_FcpTjldNctK9Q',  //user ID
    

 
    //   )
       
      console.log(res.text);
    
    
    //send mail  and OTP to forgot password component

      if(res && existsdata.data)
      {
        setLoading(false);        
       navigate("/pwdforgot",{state:{mail:data.email,value:value}}); 

      
      }
    } 
        
      
    

    return (
        
        <div>
          <ReactNotifications/>

       <div className="top">
        
       <FaKey 
        
        size={70}
        className="keyIcon"
       />
       <h2>Forgot Your Password?</h2>
            {/* <p className="infoVerify">No worries! Enter your email and we will send you an <span style={{fontWeight:"bold"}}> OTP </span> to reset the password </p> */}
       </div>
           

        <div className="Loader" > 
        {isLoading ? "Sending OTP...":""} 
         {isLoading  ?   <ThreeDots
          
          height="75"
          width="75"
          color='green'
          ariaLabel='loading'/>:""}
        </div>

         
       
       <form  noValidate action="" className="formControl" onSubmit={handleSubmit(onSubmit)} >
     
       
       {/* <label  class="lblcreate1" htmlFor="Id">User ID</label> <br /> */}
       <FaEnvelope 
          size={25}
          className="envelopeIcon"

       />
       <input   
       name="someone"
       type="email" 
       placeholder="Enter Incedo mail"  
       id="Id"
       class="verifyEmailIp"
       {...register("email" , {  
           required:true,
           pattern:/^[a-z](\.?[a-z0-9]){3,}@incedoinc\.com$/
           
       })} 
       onChange={genOTP}    
       
                                       
    /> 
     {errors.email && errors.email.type==="required" && (
                   <span className="error10"> User ID is required </span>

                )}
             {errors.email&& errors.email.type==="pattern" &&(
                     <span className="error10"> Invalid User ID </span>
                )} 
    
    <br />
        
  
  
       
         {/* {isLoading &&  changeMsg && <h5>Verifying Mail... </h5>}
         {isLoading &&  changeMsg2 && <h5>Could take few seconds...</h5>} */}
         
         <button class="requestOTP"type="submit">Send  OTP</button>


        

        </form>
      
           

      
        </div>

       
    );
}


export default VerifyEmail;
