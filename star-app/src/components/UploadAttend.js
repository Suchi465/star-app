//import { Construction } from '@mui/icons-material';
import axios from 'axios';

import React from 'react';
import Sidebar3 from './Sidebar3';
//import Leadbar from './Leadbar';
import './UploadAttend.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ReactNotifications } from "react-notifications-component"; 
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { useNavigate} from "react-router-dom"
class UploadAttend extends React.Component {

	state = {
	selectedFile: null,

	};

	onFileChange = event => {
	
	this.setState({ selectedFile: event.target.files[0] });
	
	};

	
	onFileUpload =async () => {
	
	const formData = new FormData();
	
	formData.append(
		"file",
		this.state.selectedFile
	);
	

	
	console.log(this.state.selectedFile);
	

//try{

if(	this.state.selectedFile===null)
{
	Store.addNotification({
		title:"Warning",
		message:"No file Chosen",
		type:"warning",
		container:"top-center",
		dismiss:{
			duration:2000,
			showIcon:true,
			pauseOnHover:true,
		}
	  
	})
	
}
else{

const convertData = await axios.post("http://localhost:8080/convertToSQL", formData, {
headers: {"Content-Type": "multipart/form-data"} });
console.log(convertData.msg);
console.log(convertData);
if(convertData.data==="Upload file with .xlsx extension")
{
	Store.addNotification({
		title:"Danger",
		message:"Wrong Extension ! Upload file with .xlsx extension ",
		type:"danger",
		container:"top-center",
		dismiss:{
			duration:2000,
			showIcon:true,
			pauseOnHover:true,
		}
	  
	})
}

else if(convertData)
{
	Store.addNotification({
		title:"Success",
		message:"File Uploaded Successfully",
		type:"success",
		container:"top-center",
		dismiss:{
			duration:2000,
			showIcon:true,
			pauseOnHover:true
		}
	  
	})
	
	

}


// else {
// 	Store.addNotification({
// 		title:"Warning",
// 		message:"No file Chosen",
// 		type:"warning",
// 		container:"top-center",
// 		dismiss:{
// 			duration:1000,
// 			showIcon:true,
// 		}
	  
// 	})
	
// }

}//}catch(err){alert(err)}

};
	

	
	
	render() {
	
	return (
		<div>
			<ReactNotifications/>
		<Sidebar3/>
		<center><h2>	
			UPLOAD ATTENDANCE SHEET
			</h2></center>
		<div className='left-margin2'>
			
				<input type="file" onChange={this.onFileChange} class="input-attend" onFileUpload={this.onFileUpload} style={{marginTop:"25px"}} /><br/>
				<label style={{color:"blue"}}>Please Upload file in .xlsx format only</label><br/>
			<button onClick={this.onFileUpload} className="uploadbutton">Confirm</button>
			
				</div>
               
<table id= "emp"> <thead> <tr className='uploadtr'><th>timeSheetNumber</th><th>resourceName</th><th>resourceId</th><th>periodStart</th><th>periodEnd</th><th>hours</th><th>vertical</th><th>horizontal</th><th>subHorizontal</th><th>customerId</th><th>customerName</th>

<th>projectId</th><th>projectName</th><th>Afternoon_Shift_days</th><th>Night_Shift_Days</th><th>Days_eligible_for_TA</th><th>Transport_Allowance</th><th>Total_Allowance</th></tr> </thead></table>

<div className='downloadbtn'>  

                                        <ReactHTMLTableToExcel  

                                                className="btn btn-danger"  

                                                table="emp"  

                                                filename="SampleExcel"  

                                                sheet="Sheet"  

                                                buttonText="Download Sample File" />  

                                </div>  
		</div>

	);
	}
}

export default UploadAttend;
