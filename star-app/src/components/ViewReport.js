import axios from "axios";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
import data from './mock-data.json';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import { useState,Fragment,useEffect } from "react"; 
import './ViewReport.css'
import Sidebar3 from "./Sidebar3";
const ViewReport = () => {
const [contacts, setContacts] = useState(data);
const [searchApiData,setSearchApiData]=useState([]);
    const[filterVal1,setFilterVal1]=useState("");
    const[filterVal2,setFilterVal2]=useState("");
    const[filterVal3,setFilterVal3]=useState("");
    useEffect(()=>{

        const getReport = async() =>{
    
            try{
    
                const response = await axios.get(`http://localhost:8080/getAllReports`)
    
        if(response.data){
    
            setContacts( response.data );
    
        }
    
            }catch(err){}
    
        }
    
        getReport();
    
    },[])
    //     axios.get(`http://localhost:8080/getAllReports`)
    //     .then(res => {
    //       const contacts = res.data;
    //       setContacts( contacts );
    //     })    .catch(err => {
    //       console.log(err)
    //   });
  
    const [editFormData, setEditFormData] = useState({
        timeSheetNumber:"",
        resourceName:"",
        resourceId: 0,
        periodStart:"",
        periodEnd:"",
        hours:0,
        vertical:"",
        horizontal:"",
        subHorizontal:"",
        customerId:"",   
        customerName:"",
        projectId:"",
        projectName:"",
        Afternoon_Shift_days: 0,
        Night_Shift_Days: 0,
        Days_eligible_for_TA: 0,
        Transport_Allowance: 0,
        Total_Allowance: 0,
    });
  
    const [editContactId, setEditContactId] = useState(null);
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = Number(event.target.value);

      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedContact = {
      timeSheetNumber:editContactId,
      resourceName:editFormData.resourceName,
      resourceId:editFormData.resourceId,
      periodStart:editFormData.periodStart,
      periodEnd:editFormData.periodEnd,
      hours:editFormData.hours,
      vertical:editFormData.vertical,
      horizontal:editFormData.horizontal,
      subHorizontal:editFormData.subHorizontal,
      customerId:editFormData.customerId,   
      customerName:editFormData.customerName,
      projectId:editFormData.projectId,
      projectName:editFormData.projectName,
      Afternoon_Shift_days: editFormData.Afternoon_Shift_days,
      Night_Shift_Days: editFormData.Night_Shift_Days,
      Days_eligible_for_TA: editFormData.Days_eligible_for_TA,
      Transport_Allowance: editFormData.Transport_Allowance,
      Total_Allowance: editFormData.Total_Allowance,
      };
   console.log(editFormData);
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((contact) => contact.timeSheetNumber === editContactId);
  
      newContacts[index] = editedContact;
  
      setContacts(newContacts);
      setEditContactId(null);
    };
  
    const handleEditClick = (event, contact) => {
      event.preventDefault();
      setEditContactId(contact.timeSheetNumber);
      const formValues = {
      timeSheetNumber:contact.timeSheetNumber,
      resourceName:contact.resourceName,
      resourceId:contact.resourceId,
      periodStart:contact.periodStart,
      periodEnd:contact.periodEnd,
      hours:contact.hours,
      vertical:contact.vertical,
      horizontal:contact.horizontal,
      subHorizontal:contact.subHorizontal,
      customerId:contact.customerId,   
      customerName:contact.customerName,
      projectId:contact.projectId,
      projectName:contact.projectName,
      Afternoon_Shift_days: contact.Afternoon_Shift_days,
      Night_Shift_Days: contact.Night_Shift_Days,
      Days_eligible_for_TA: contact.Days_eligible_for_TA,
      Transport_Allowance: contact.Transport_Allowance,
      Total_Allowance: contact.Total_Allowance,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = (e) => {
        e.preventDefault();
      setEditContactId(null);
    };
    const handleFilter=(e)=>{
        if(e.target.value===''){
          setContacts(contacts)
          
        }else{
          setContacts(contacts.filter(item=>item.projectName.toLowerCase().includes(e.target.value.toLowerCase())));
          
        }
        setFilterVal1(e.target.value);
      };
      const handleFilter1=(e)=>{
        if(e.target.value===''){
          setContacts(contacts)
          
        }else{
          setContacts(contacts.filter(item=>item.periodStart.toLowerCase().includes(e.target.value.toLowerCase())));
          
        }
        setFilterVal2(e.target.value);
      };
      const handleFilter2=(e)=>{
        if(e.target.value===''){
          setContacts(contacts)
          
        }else{
          setContacts(contacts.filter(item=>item.periodEnd.toLowerCase().includes(e.target.value.toLowerCase())));
          
        }
        setFilterVal3(e.target.value);
      };
    
  
    return (
      <div >
        <Sidebar3/>
       <center><h2> ALLOWANCE DASHBOARD</h2></center> <br/><br/>
      <center><input placeholder='Project Name' list="users" value={filterVal1} onInput={(e)=>handleFilter(e)} className="projectinp"/>   
                 <datalist id="users">
        
    <option value="Digital">Digital</option>
    <option value="Enterprise_Platforms">Enterprise Platforms</option>
    <option value="CET">CET</option>
    <option value="Data">Data</option>
  </datalist>
  
  <input placeholder='Start Date' list="month" value={filterVal2} onInput={(e)=>handleFilter1(e)} className="startinput"/>   
                 <datalist id="month">
    <option value="Jan">Jan </option>
    <option value="Feb">Feb</option>
    <option value="Mar">Mar</option>
    <option value="Apr">Apr </option>
    <option value="May">May </option>
    <option value="Jun">Jun</option>
    <option value="Jul">Jul</option>
    <option value="Aug">Aug</option>
    <option value="Sep">Sep</option>
    <option value="Oct">Oct</option>
    <option value="Nov">Nov</option>
    <option value="Dec">Dec</option>
  </datalist>
  <input placeholder='End Date' list="month" value={filterVal3} onInput={(e)=>handleFilter2(e)} className="endinput"/>   
                 <datalist id="month">
    <option value="Jan">Jan </option>
    <option value="Feb">Feb</option>
    <option value="Mar">Mar</option>
    <option value="Apr">Apr </option>
    <option value="May">May </option>
    <option value="Jun">Jun</option>
    <option value="Jul">Jul</option>
    <option value="Aug">Aug</option>
    <option value="Sep">Sep</option>
    <option value="Oct">Oct</option>
    <option value="Nov">Nov</option>
    <option value="Dec">Dec</option>
  </datalist>
  </center>
  <br/>
  <br/>
  <center><div>
                            <ReactHTMLTableToExcel  
                            className="btn btn-info"  
                            table="emp"  
                            filename="ReportExcel"  
                            sheet="Sheet"  
                            buttonText="Export excel" />  
                            </div>
                            </center>
  <div>  
                
                                </div> <br/><br/> 
        <form onSubmit={handleEditFormSubmit}>
          <div className="fixTableHead">
          <table id= "emp">
            <thead>
              <tr>
             
           <th className="reportth">timeSheetNumber</th>
           <th className="reportth">resourceName</th>
           <th className="reportth">resourceId</th>
           <th className="reportth">periodStart</th>
           <th className="reportth">periodEnd</th>
           <th className="reportth">hours</th>
           <th className="reportth">vertical</th>
           <th className="reportth">horizontal</th>
           <th className="reportth">subHorizontal</th>
           <th className="reportth">customerId</th>
           <th className="reportth">customerName</th>
           <th className="reportth">projectId</th>
           <th className="reportth">projectName</th>
           <th className="reportth">Afternoon_Shift_days</th>
           <th className="reportth">Night_Shift_Days</th>
           <th className="reportth">Days_eligible_for_TA</th>
           <th className="reportth">Transport_Allowance</th>

           <th className="reportth">Total_Allowance</th>
           <th className="reportth"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact.timeSheetNumber ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          </div>
        </form>
      
      </div>
    );
  };
  
  export default ViewReport;

  