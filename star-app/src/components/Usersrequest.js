import axios from 'axios';
import React, { useState, useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import BootstrapTable from 'react-bootstrap-table-next';
import Sidebar from './Sidebar';
import './Usersrequest.css';
import { Navigate, useNavigate} from "react-router-dom"
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


const Usersrequest=()=>{

       let navigate=useNavigate();
        const [users, setUsers] = useState([]);
        const [id, setid] = useState("");
        const [role, setrole] = useState("");
        const [count,setCount]=useState(0);
     
        const[order,setorder]=useState("ASC");
        
        const sorting=(col)=>{
          if(order==="ASC"){
            const sorted=[...users].sort((a,b)=>a[col].toLowerCase()>b[col].toLowerCase()?1:-1);
            setUsers(sorted);
           setorder("DSC")
          }
          if(order==="DSC"){
            const sorted=[...users].sort((a,b)=>a[col].toLowerCase()<b[col].toLowerCase()?1:-1);
            setUsers(sorted);
            setorder("ASC")
          }
        }
        const columns=[
          {dataField:'id',text:'id'},
          {dataField:'username',text:'username',sort:true},
          {dataField:'status',text:'Status',sort:true},
          {dataField:'role',text:'role',sort:true},
          {dataField:'activefrom',text:'active from',sort:true}
         
        ]
       useEffect(() => {
          const getUsers = async () => {
            try {
              const response = await axios.get("http://localhost:8080/getAll");
              setUsers(response.data.filter((element,index)=>{return  element.status!=='Active' && element.status!=='Inactive' }));
              
              console.log(response.data);
            } catch (err) {
              console.log(err);
            }
          };
          getUsers();
        }, [count]);
  const  acceptRequest=(user)=>{
            var bodyFormData = new FormData();
            bodyFormData.append("id", user);
            console.log(bodyFormData);
            axios({
              method: "post",
              url: "http://localhost:8080/acceptRequest",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
                console.log("user accepted", response.data);
                Store.addNotification({
                  title:"Success",
                  message:"User's request  with id "+user+"  has been accepted " ,
                  type:"success",
                  container:"top-center",
                  dismiss:{
                      duration:2000,
                      showIcon:true,
                      pauseOnHover:true,
                  }
                
              })
                setCount(count+1);

               setTimeout(()=>{
                 navigate("/viewstatus");
               },3000)
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
        const  denyRequest=(user)=>{
          var bodyFormData = new FormData();
          bodyFormData.append("id", user);
          console.log(bodyFormData);
          axios({
            method: "post",
            url: "http://localhost:8080/denyRequest",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
              console.log("user request is denied", response.data);
              Store.addNotification({
                title:"Success",
                message:user+ " access has been denied",
                type:"success",
                container:"top-center",
                dismiss:{
                    duration:2000,
                    showIcon:true,
                    pauseOnHover:true,
                }
               

              
            })
              setCount(count+1);
              setTimeout(()=>{
                navigate("/viewstatus");
              },3000)
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
                    pauseOnHover:true
                }
              
            })
              console.log("Something went wrong", error);
            });
      };
    return (
    <div className='outermostdiv3'>
    <ReactNotifications />
    <div className='Usersrequest' >
      <Sidebar/>
      <h1 style={{textAlign:"center"}}>User Requests</h1>
        <center>
        <table className="table table-stripped " style={{marginLeft:"25px"}}>
          <thead>
            <th> Id </th>
            <th onClick={()=>sorting("username")} > User Name </th>
            <th> Status</th>
            <th> Role</th>
            <th onClick={()=>sorting("activeFrom")}>Active From</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td> {user.id} </td>
                <td> {user.username} </td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>{user.activeFrom}</td>
               <td><button type="button"  onClick={()=>acceptRequest(user.id)}>AcceptRequest</button>
               <button type="button" onClick={()=>denyRequest(user.id)}>DenyRequest</button></td>
              </tr>
            ))}
          </tbody>
        </table>
            </center>
       </div>
  </div>
    )
    
}
export default Usersrequest;