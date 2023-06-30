 import axios from "axios";
import React, { useState} from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './signup.css'
import {Link} from 'react-router-dom'; 



function Signup()
{

       let navigate=useNavigate();
       const [showPwd,setpwd]=useState(false);   //use state for show password
       const [SignupData,setData]=useState(false);  //sign up data
       const [userexists,setUserExists]=useState(false);   //check if user exists on blur
       const [passwordStrength,setPasswordStrength]=useState({
           password:'',
           weak:false,
           okay:false,
           strong:false,
       })      
       
        const {register,handleSubmit,watch,formState:{errors}}=useForm();
        
        const email=watch("email","");
       
         
        function checkPwdStrength(e)
        {
            const {value,name}=e.target;

          
        
            setPasswordStrength((prevVal)=>{  
   
                //strong password--ATLEAST(One uppercase,one special character,two numbers,4 lowercase)
                if(passwordStrength.password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/))
                return {
                    
                    [name]:value,
                    strong:true,
                    weak:false,
                    okay:false
                }  
                //Okay password--ATLEAST(One uppercase,two number,3 lowercase)
                else if(passwordStrength.password.match(/^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z].).{6,}$/))
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
     
        function changeIcon()  // change eye icon to show/hide password 
        {
             setpwd((prevVal) =>{
                  return !prevVal;
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
    

       
            const onSubmit=(data)=>{                               //button on submit,call register method in server
                var bodyFormData=  new FormData();
                bodyFormData.append('id',data.email);
                bodyFormData.append('username',data.username);
                bodyFormData.append('password',data.password)
                bodyFormData.append('role',data.role);
            
                
                
                axios({
                    method: "post",
                    url: "http://localhost:8080/register",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then(function (response) {
                      //handle success
                      setData(response.data);
                      
                    })
                    .catch(function (response) {
                      //handle error
                      console.log(response);
                    });
                    if(!userexists)
                    {
                        Store.addNotification({
                            title:"SignUp Successful",
                            message:"We'll let you know once the request has been accepted",
                            type:"info",
                            container:"top-center",
                            dismiss:{
                                duration:2000,
                                showIcon:true,
                                pauseOnHover:true,
                            }
                          
                        })

                    }
                    
               if(!userexists)    //only navigate to user page if id is new(New User)
               setTimeout(()=>{
               navigate("/login");
                
               },3000)
                
            }
     
 return (
        <div className="outermostdiv2">
        <ReactNotifications/>
      <div className="bg-img"><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/></div>


        

        <div className="container4">
          
        <h2 style={{textAlign:"center"}}>SignUp</h2>
          
            <form  noValidate action="" className="formControl" onSubmit={handleSubmit(onSubmit)} >
               <div className="innerDiv" >
                <label  class="lblsignup"htmlFor="Id">User ID</label>
                <input 
                class="ipsignup"
                type="email" 
                placeholder="Enter Incedo mail"  
                id="Id"
                {...register("email" ,{  
                    required:true,
                    pattern:/^[a-z](\.?[a-z0-9]){3,}@incedoinc\.com$/
                    
                })}
                onBlur={checkUserExists}
                                                  
             />
             {userexists && <span className="error4"> User already exists</span> }
             {errors.email && errors.email.type==="required" && (
                   <span className="error4"> User ID is required </span>

                )}
             {errors.email&& errors.email.type==="pattern" &&(
                     <span className="error4"> Invalid User ID </span>
                )} 
                </div>
                
               <div className="innerDiv" >
                <label  class="lblsignup" htmlFor="username"> Username </label>
                <input class="ipsignup" type="text"  
                placeholder="Enter username" 
                id="username"
                {...register("username",{
                    required:true,
                    minLength:5,
                    maxLength:15
                })}  />
                {errors.username && errors.username.type==="required" && (
                    <span className="error4"> Username is required </span>

                )}
                {errors.username &&errors.username.type==='minLength' && (
                    <span className="error4">Minimum 5 characters</span>
                )}
                {errors.username &&errors.username.type==='maxLength' && (
                    <span className="error4">Maxinum 20 characters</span>
                )}
                </div>
                
                <div className="innerDiv" >
                <label class="lblsignup" htmlFor="Role"> Role </label>
                <select class="ipsignup"   id="Role" {...register("role" ,{
                    required:true
                })}>
                    
                <option    required selected="true" disabled="disabled">-- Select a Role --</option>
                    <option value="Lead">Lead</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                </select>
                {errors.role && errors.role.type==='required' && (
                    <span className="error4">Please select a role</span>
                )}

                </div>
               
                   
                <div className="innerDiv" >
                <label  class="lblsignup" htmlFor="password">Password</label>
                <input  class="ipsignup" type={showPwd ?"text" :"password"} 
                placeholder="Enter password"  id="pwd"
                 {...register("password" ,
                 {
                     required:true,
                     
                
                })}
                 onChange={checkPwdStrength}
                />
               
              
                {errors.password && errors.password.type==='required' && (
                    <span className="error4">Password is required </span>
                )}
                {/* <i id="passwordImg4" className={showPwd?"fa fa-eye":"fa fa-eye-slash"} onClick={changeIcon}></i> */}
                <div className=" weak4" style={{...passwordStrength.weak && {backgroundColor:'red'}}} > </div>
                {passwordStrength.weak && <span class="weakmsg4"> Weak</span>}
           
                <div className=" okay4"  style={{...passwordStrength.okay && {backgroundColor:'yellow'}}} ></div>
                {passwordStrength.okay && <span class="okaymsg4"> Okay </span>}
                <div className=" strong4"  style={{...passwordStrength.strong && {backgroundColor:'green'}}}></div>
                {passwordStrength.strong && <span class="strongmsg4"> Strong </span>}
                </div>
               
                   <div className="buttonDiv">
                   <button className="btn4" type="submit">Request Access </button>
                   </div>
                   <br/><br/><br/><br/>
                   <Link to="/login" className="btn btn-danger">
                Cancel
              </Link>
               </form>
            
        </div>
    </div>

    );
}

export default Signup;
