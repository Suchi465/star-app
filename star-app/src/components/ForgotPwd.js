import React,{useState} from "react"
import axios from "axios";
import Cookies from "universal-cookie";
import {useForm} from "react-hook-form";
import "../css_Modules/forgotPwd.css"
import {useNavigate} from "react-router-dom"
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

function ForgotPwd()
{
    let navigate=useNavigate();
    const {register,handleSubmit,watch,formState:{errors}}=useForm();
    const [userexists,setUserExists]=useState(true);   //check if user exists on blur
    const email=watch("email","");
    const [showPwd,setpwd]=useState(false);   //use state for show password
    const [showPwd2,setpwd2]=useState(false);  //for new Password
    
    
    
    const [passwordStrength,setPasswordStrength]=useState({
        password:'',
        weak:false,
        okay:false,
        strong:false,
    })    
    const [pwdChanged,setPwdMessage]=useState(false);

  
   
    
    function changeIconpwd2()    //change icon when clicked on new password
    {
    setpwd2((prevVal)=>{
        return !prevVal
    })
}

    function checkPwdStrength(e)   //check password strength
    {
        
        const {value,name}=e.target;
      

        setPasswordStrength((prevVal)=>{  

            //strong password--ATLEAST(One uppercase,one special character,two numbers,4 lowercase)
            if(passwordStrength.password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{7,}$/))
            return {
                
                [name]:value,
                strong:true,
                weak:false,
                okay:false
            }  
            //Okay password--ATLEAST(One uppercase,two number,4 lowercase)
            else if(passwordStrength.password.match(/^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$/))
            return {
                        [name]:value,
                        okay:true,
                        strong:false,
                        weak:false

            }
            else {
                return {
                    [name]:value,
                    weak:true,
                    strong:false,
                    okay:false
                }
            }
         
             


        });
    }
 
    function checkUserExists()
    {

        var bodyFormData=new FormData();
        bodyFormData.append('email',email);

        axios({
            method:"post",
            url:"http://localhost:8080/idexists",
            data:bodyFormData,
            headers:{"Content-Type":"multipart/form-data"},

        }).then(res=>{
            setUserExists(res.data);
        }).catch(res=>{
            console.log(res);
        })
    }

   

 const onSubmit=async(e)=>
        { 
            
             var formBodyData=new FormData();
              formBodyData.append('id',email);
              formBodyData.append('newPwd',passwordStrength.password);

              const res2=await axios({
                  method:"put",
                  url:"http://localhost:8080/forgotPassword",
                  data:formBodyData,
                  headers:{"Content-Type":"multipart/form-data"}
              })
              console.log(res2.data);
                res2.data && setPwdMessage(res2.data);
             
             if(userexists)
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
             }

             setTimeout(()=>{
                navigate('/login');
          
             },3000)
         
        }
       
    
    return (
       <div className="outermostdiv3">
           <ReactNotifications/>
           <h2 style={{textAlign:"center"}}>Forgot Password </h2>
         <div className="container3">
       
                <form  noValidate action="" className="formControl" onSubmit={handleSubmit(onSubmit)} >
              
                <div className="innerDiv3" >
                <label  class="lblcreate1" htmlFor="Id">User ID</label> <br />
                <input  
                type="email" 
                placeholder="Enter Incedo mail"  
                id="Id"
                class="forgotpwdip"
                {...register("email" ,{  
                    required:true,
                    pattern:/^[a-z](\.?[a-z0-9]){3,}@incedoinc\.com$/
                    
                })}
                onBlur={checkUserExists}
                
                                                
             />
             {!userexists && <span className="error7">User not registered</span> }
             {errors.email && errors.email.type==="required" && (
                   <span className="error7"> User ID is required </span>

                )}
             {errors.email&& errors.email.type==="pattern" &&(
                     <span className="error7"> Invalid User ID </span>
                )} 
                </div>

                


             <div class=" innerDiv3 innerdiv2" >
                <label class="lblcreate2"> Create new password </label> <br />
                <input   class=" forgotpwdip ipcreate "name="password"   placeholder="Enter new password" type={showPwd2 ?"text" :"password"}  
                {...register("password",{
                    required:true,
                   
                })}   
                onChange={checkPwdStrength}
                />

                {errors.password && errors.password.type==='required' && (
                    <span className="error7">Password is required </span>
                )} 
                {/* <i   className={showPwd2?"fa fa-eye passwordImg7":"fa fa-eye-slash passwordImg7"} onClick={ changeIconpwd2}    onChange={checkPwdStrength} ></i> */}
            
                <div className=" weak1" style={{...passwordStrength.weak && {backgroundColor:'red'}}} > </div>
                {passwordStrength.weak && <span class="weakmsg1"> Weak</span>}

                <div className=" okay1"  style={{...passwordStrength.okay && {backgroundColor:'yellow'}}} ></div>
                {passwordStrength.okay && <span class="okaymsg1"> Okay </span>}

                <div className=" strong1"  style={{...passwordStrength.strong && {backgroundColor:'green'}}}></div>
                {passwordStrength.strong && <span class="strongmsg1"> Strong </span>}
                </div>
                
               
                <button type="submit"   class="submitchangePwd2 ">Submit</button>
              

                </form>
                
            </div>
     </div>
         
    );
}
export default ForgotPwd;