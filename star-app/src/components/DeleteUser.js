import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SubMenu from "./SubMenu";
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { type } from "@testing-library/user-event/dist/type"

//import 'bootstrap/dist/css/bootstrap.min.css';
import './Usersrequest.css';
import { Navigate, useNavigate } from "react-router-dom";
import { Form } from "formik";
const DeleteUser = () => {

  let navigate=useNavigate();
  const [users, setUsers] = useState([]);
  const [id, setid] = useState("");
  //const [username, setusername] = useState("");
  //const [Status, setstatus] = useState("");
  const [role, setrole] = useState("");
  const [count,setCount]=useState(0);
  const [searchApiData,setSearchApiData]=useState([]);
  const[filterVal,setFilterVal]=useState("");
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAll");
        setUsers(response.data);
        setSearchApiData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [count]);

  const deletedUser = (user) => {
    var bodyFormData = new FormData();
    bodyFormData.append("id", user);
    console.log(bodyFormData);
    axios({
      method: "delete",
      url: "http://localhost:8080/deleteUser",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }) .then((response) => {
        console.log("user deleted", response.data);
        Store.addNotification({
          title:"Success",
          message:"User ID " +user+" deleted successfully" ,
          type:"success",
          container:"top-center",
          dismiss:{
              duration:2000,
              
              showIcon:true,
              pauseOnHover:true,
              

          }
        
      })
        setCount(count+1);

        if(response.data)
        {
          setTimeout(()=>{
             navigate("/viewstatus");
          },3000)
        }
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  const handleFilter=(e)=>{
    if(e.target.value===''){
      setUsers(searchApiData)
    }else{
      setUsers(searchApiData.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    setFilterVal(e.target.value);
  }
  return (
  <div className="outermostdiv3">
  <ReactNotifications />

    
   <div className="deleteUser">
  <Sidebar/>
    <h1 style={{textAlign:"center"}}>Delete User</h1>
   <input placeholder='Search by user names' style={{marginLeft:"25px"}} value={filterVal} onInput={(e)=>handleFilter(e)}/><br/><br/>
    <center>
    <table className="table table-striped" style={{marginLeft:"25px"}}>
      <thead>
        <th> Id </th>
        <th> User Name </th>
        <th>Action</th>
       
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td> {user.id} </td>
            <td> {user.username} </td>
            <td><button onClick={()=>deletedUser(user.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
        </center>
  </div>
</div>
)

}
export default DeleteUser;