
import axios from 'axios';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

import Sidebar from './Sidebar';

const ViewStatus=()=>{
        const [users, setUsers] = useState([]);
        const [id, setid] = useState("");
        const [username, setusername] = useState("");
        const [Status, setstatus] = useState("");
        const [role, setrole] = useState("");
        const [count,setCount]=useState(0);
        const [searchApiData,setSearchApiData]=useState([]);
        const[filterVal,setFilterVal]=useState("");
     
       const columns=[
          {dataField:'id',text:'id'},
          {dataField:'username',text:'username',sort:true},
          {dataField:'status',text:'Status',sort:true},
          {dataField:'role',text:'role',sort:true},
          {dataField:'activeFrom',text:'activeFrom',sort:true}
         
        ]
       /* const afterSearch = (newResult) => {
          console.log(newResult);
        };*/
       useEffect(() => {
          const getUsers = async () => {
            try {
              const response = await axios.get("http://localhost:8080/getAll");
            
           setUsers( response.data.filter((element,index)=>{return element.status==='Active'}));
           setSearchApiData(response.data.filter((element,index)=>{return element.status==='Active'}));
     
          // setUsers(newarr);
            } catch (err) {
              console.log(err);
            }
          };
          getUsers();
        }, [count]);
     const handleFilter=(e)=>{
       if(e.target.value===''){
         setUsers(searchApiData)
       }else{
         setUsers(searchApiData.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase())));
       }
       setFilterVal(e.target.value);
     }
    return (<div className='viewstatus'>
         <Sidebar/>
         <h1 style={{textAlign:"center"}}> Status </h1>
    <div ><input placeholder='Search by names' value={filterVal} onInput={(e)=>handleFilter(e)}/></div>
      <BootstrapTable keyField='id' data={users} columns={columns} striped hover  />
    </div>)
    
}
export default ViewStatus;