import React from "react";
import './ViewReport.css'
import ViewReport from "./ViewReport";
const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
  
    <tr>
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="timeSheetNumber"
          value={editFormData.timeSheetNumber}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="resourceName"
          value={editFormData.resourceName}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="resourceId"
          value={editFormData.resourceId}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="periodStart"
          value={editFormData.periodStart}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="periodEnd"
          value={editFormData.periodEnd}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="hours"
          value={editFormData.hours}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
   
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="vertical"
          value={editFormData.vertical}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="horizontal"
          value={editFormData.horizontal}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="subHorizontal"
          value={editFormData.subHorizontal}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="customerId"
          value={editFormData.customerId}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="customerName"
          value={editFormData.customerName}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="projectId"
          value={editFormData.projectId}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      <td className="reporttd">
        <input
          type="text"
          required="required"
          name="projectName"
          value={editFormData.projectName}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="Afternoon_Shift_days"
          value={editFormData.Afternoon_Shift_days}
          onChange={handleEditFormChange}
          min="0"
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="Night_Shift_Days"
          value={editFormData.Night_Shift_Days}
          onChange={handleEditFormChange}
          min="0"
        ></input>
      </td>
    
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="Days_eligible_for_TA"
          value={editFormData.Days_eligible_for_TA}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="Transport_Allowance"
         // value={//editFormData.Transport_Allowance}
         value={150}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
     
      <td className="reporttd">
        <input
          type="number"
          required="required"
          name="Total_Allowance"
          value={editFormData.Total_Allowance}
          onChange={handleEditFormChange}
          readOnly
        ></input>
      </td>
      
      <td className="reporttd">
        <button type="submit" >

Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    
    </tr>
  
  );
};

export default EditableRow;
