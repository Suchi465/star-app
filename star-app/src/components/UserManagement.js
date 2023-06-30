import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import SubMenu from "./SubMenu";
import { SidebarData } from "./SidebarData";
import "./Usersrequest.css";
import { useNavigate} from "react-router-dom"
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

export default function UserManagement() {

  let navigate=useNavigate();
  const [users, setUsers] = useState({
    id: "",
    role: "",
  });

  const inputChangedHandler = (e) => {
    const state = users;
    state[e.target.name] = e.target.value;
    setUsers({ ...state });
  };


  const [count, setCount] = useState(0);
  console.log(users.id);
 
  const changerole = (e) => {
    e.preventDefault();
    
    var bodyFormData = new FormData();
    bodyFormData.append("id", users.id);
    bodyFormData.append("newRole", users.role);
   

    axios({
      method: "put",
      url: "http://localhost:8080/changeRole",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("user data updated successfully", response.data);
       
        
          Store.addNotification({
            title:"Success",
            message:"Role changed",
            type:"success",
            container:"top-center",
            dismiss:{
                duration:2000,
                showIcon:true,
                pauseOnHover:true,
            }
          
        })  
      setCount(count + 1);
      if(response.data)
      {
        setTimeout(()=>{
             navigate("/viewstatus");
        },3000)
      }
        
      })
      .catch((error) => {
        Store.addNotification({
          title:":-(",
          message:"Something went wrong",
          type:"danger",
          container:"top-center",
          dismiss:{
              duration:2000,
              showIcon:true,
              pauseOnHover:true,
          }
        
      })
      });
  };

  return (
    
      
    <div>
      <ReactNotifications/>
      <Sidebar />
      <div className="UserManagement">
        <center>
          <h2 className="text-center"> Update Role </h2>

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> ID :</label>
                <input
                  type="text"
                  placeholder="Enter id"
                  name="id"
                  value={users.id}
                  className="w3-input w3-border"
                  onChange={inputChangedHandler}
                ></input>
              </div>
              <br />
              <br />
              <div className="form-group mb-2">
                <label className="form-label"> Role :</label>
                <input
                  type="text"
                  placeholder="Enter role"
                  name="role"
                  value={users.role}
                  onChange={inputChangedHandler}
                ></input>
              </div>
              <br />
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={changerole}
              >
                Submit
              </button>
              <br/>
              <br/>
              <Link to="/viewstatus" className="btn btn-danger">
                Cancel
              </Link>
            </form>
          </div>
        </center>
      </div>
    </div>
  
  );
}
