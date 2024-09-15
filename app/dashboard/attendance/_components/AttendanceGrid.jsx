import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth, refreshData }) {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: 'studentId', filter:true},
    { field: 'name', filter:true, }
  ])

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'));
  const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);


  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord();
      setRowData(userList);

      daysArrays.forEach((date) => {
        setColDefs(prevData => [...prevData, {
          field: date.toString(), width:50, editable:true,
        }])

        userList.forEach(obj =>{
          obj[date] = isPresent(obj.studentId, date);
        })
      })
    }

  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(item => item.day == day && item.studentId == studentId);
    return result? true : false;
  }

  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });
    return uniqueRecord;
  };

  const onMarkAttendance = (day, studentId, presentStatus) =>{
    const date = moment(selectedMonth).format('MM/yyyy')
    if(presentStatus){
      const data = {
        day:day,
        studentId: studentId,
        present: presentStatus,
        date:date,
      }
      GlobalApi.MarkAttendance(data).then(resp =>{
        console.log(resp);
        toast("Student Id " +studentId+ ": Marked as present");
      })
    }

    else{
      GlobalApi.MarkAbsent(studentId, day, date)
      .then(resp =>{
        toast("Student Id " + studentId+ ": Marked as absent");
      })
    }
  }


  return (
    <div>
      <div
        className="ag-theme-quartz-auto-dark"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
  