import axios from "axios";
import React,{useState} from "react"
import Cookies from "universal-cookie";
import './changepwd.css'
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import Sidebar3 from "./Sidebar3";
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import {useNavigate} from 'react-router-dom'

function ChangePwd() 
 {
     
    let navigate=useNavigate();
    const cookie=new Cookies();
    const [showPwd,setpwd]=useState(false);   //use state for show password
    const [showPwd2,setpwd2]=useState(false);
    const [passwordStrength,setPasswordStrength]=useState({
        password:'',
        weak:false,
        okay:false,
        strong:false,
    })      
    
    const [oldpwd,setOldPwd]=useState('');
    const [pwdsame,checkPwdaresame]=useState(true);
    const [pwdChanged,setPwdMessage]=useState(false);

    function updatePwd(e)
    {
        setOldPwd(e.target.value);
    }
      
  
    function changeIconpwd2()    //change icon when clicked on new password
        {
        setpwd2((prevVal)=>{
            return !prevVal
        })
    }

    function changeIcon()  // change eye icon to show/hide password 
    {
         setpwd((prevVal) =>{
              return !prevVal;
        });

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

       const checkPwd= async(e)=>{

                                         //on submit 
       
             e.preventDefault();
             
             var bodyFormData=new FormData();
             bodyFormData.append('id',cookie.get('id'));
             bodyFormData.append('oldPwd',oldpwd);
               
             const res=await axios({                               //check if the password entered by the user is same as in DB
                 method:"post",
                 url:"http://localhost:8080/checkPasswordSame",
                 data:bodyFormData,
                 headers:{"Content-Type":"multipart/form-data"}
             })

             if(!res.data)
             {
                 checkPwdaresame(res.data);
             }

          if(res.data)    //if password matches ,add new password and save it to DB
          {
                var formBodyData=new FormData();
                formBodyData.append('id',cookie.get('id'));
                formBodyData.append('newPwd',passwordStrength.password);

                const res2=await axios({
                    method:"put",
                    url:"http://localhost:8080/forgotPassword",
                    data:formBodyData,
                    headers:{"Content-Type":"multipart/form-data"}
                })
                res2.data && setPwdMessage(res2.data);
                if(res2.data)
                {
                    Store.addNotification({
                        title:"Success",
                        message:"Password Changed Successfully",
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
                    navigate("/profile")
                },3000)

           
          }
       }
    
    return (

        <div >
            <ReactNotifications />

        <div >
                 {cookie.get('role')==="Admin" && <Sidebar/>}
                {cookie.get('role')==='Developer' && <Sidebar2/>} 
                {cookie.get('role')==='Lead' && <Sidebar3/>}
        

              {/* <h1 style={{textAlign:"center"}}> Change Password</h1> */}
           
 
            <form class="changePwdForm" onSubmit={checkPwd}>
            
         <center>  <h2 style={{marginLeft:"100px"}}> Change password </h2></center>
            <div class="changePwdInside1">
            <label> Username</label> <br/>
            <p class="usernamePara">  {cookie.get('username')}</p>
            </div>

            <div class="changePwdInside1">
                <label>Current Password</label>  
                <br />
                <input type={showPwd ?"text" :"password"} placeholder="Enter Current Password" class="editIp4"  onChange={updatePwd} required/>

                {!pwdsame && <span className="error6">Incorrect Password</span> }
                {/* <i  className={showPwd?"fa fa-eye passwordImg2":"fa fa-eye-slash passwordImg2"} onClick={changeIcon}></i> */}
            </div>

            <div class="changePwdInside2" >
                <label> Create New Password </label> <br />
                <input  name="password" type={showPwd2 ?"text" :"password"} placeholder="Enter New Password" required class="editIp4"  onChange={checkPwdStrength}/>
                {/* <i   className={showPwd2?"fa fa-eye passwordImg2":"fa fa-eye-slash passwordImg2"} onClick={ changeIconpwd2}    onChange={checkPwdStrength} ></i> */}
            

           
           
                <div className=" weak2" style={{...passwordStrength.weak && {backgroundColor:'red'}}} > </div>
                {passwordStrength.weak && <span class="weakmsg2"> Weak</span>}

                <div className=" okay2"  style={{...passwordStrength.okay && {backgroundColor:'yellow'}}} ></div>
                {passwordStrength.okay && <span class="okaymsg2"> Okay </span>}

                <div className=" strong2"  style={{...passwordStrength.strong && {backgroundColor:'green'}}}></div>
                {passwordStrength.strong && <span class="strongmsg2"> Strong </span>}
                </div>

              <button type="submit"   class="submitchangePwd3 ">Submit</button>
             </form>
            

            
        </div>
        </div>

    )

 }
export default ChangePwd;