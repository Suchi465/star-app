import React from "react";
import './ViewReport.css'
const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={contact.timeSheetNumber}>
      {/*
      <td>{contact.Name}</td>
      <td>{contact.SAP_id}</td>
      <td>{contact.Project_Hours}</td>
      <td>{contact.Holiday_leave_hours}</td>
      <td>{contact.Afternoon_Shift_days}</td>
      <td>{contact.Night_Shift_Days}</td>
      <td>{contact.Days_eligible_for_TA}</td>
      <td>{contact.Transport_Allowance}</td>
      <td>{contact.Transport_Allowance * (contact.Afternoon_Shift_days + contact.Night_Shift_Days - contact.Holiday_leave_hours/8)}</td>
      */}
  
           <td className="reporttd">{contact.timeSheetNumber}</td>
           <td className="reporttd">{contact.resourceName}</td>
           <td className="reporttd">{contact.resourceId}</td>
           <td className="reporttd">{contact.periodStart}</td>
           <td className="reporttd">{contact.periodEnd}</td>
           <td className="reporttd">{contact.hours}</td>
           <td className="reporttd">{contact.vertical}</td>
           <td className="reporttd">{contact.horizontal}</td>
           <td className="reporttd">{contact.subHorizontal}</td>
           <td className="reporttd">{contact.customerId}</td>
           <td className="reporttd">{contact.customerName}</td>
           <td className="reporttd">{contact.projectId}</td>
           <td className="reporttd">{contact.projectName}</td>
           <td className="reporttd">{contact.Afternoon_Shift_days}</td>
          <td className="reporttd">{contact.Night_Shift_Days}</td>
          <td className="reporttd">{isNaN(contact.Afternoon_Shift_days + contact.Night_Shift_Days)?0:(contact.Afternoon_Shift_days + contact.Night_Shift_Days)}</td>
          <td className="reporttd">{150}</td>
          <td className="reporttd">{isNaN(150 * (contact.Afternoon_Shift_days + contact.Night_Shift_Days))?0:(150 * (contact.Afternoon_Shift_days + contact.Night_Shift_Days))}</td>
          <td className="reporttd">
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <input type="button" value="Edit" onClick={(event) => handleEditClick(event, contact)}/>
        {/* <button type="button" onClick={() => handleDeleteClick(contact.timeSheetNumber)}>
          Delete
        </button> */}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
