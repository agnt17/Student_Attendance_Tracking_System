"use client";
import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));  // Set default to current month
  const [selectedGrade, setSelectedGrade] = useState(null);  // Set initial grade as null or a default grade
  const [attendanceList, setAttendanceList] = useState([]);  // Initialize as empty array

  // Moved GetAttendanceList outside
  const GetAttendanceList = () => {
    const month = moment(selectedMonth).format('MM/YYYY');  // Adjust format if needed
    GlobalApi.GetAttendanceList(selectedGrade, month)
      .then((resp) => {
        console.log(resp.data);
        setAttendanceList(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  };

  useEffect(() => {
    GetAttendanceList();  // Fetch attendance data on component mount
  }, []);

  const onSearchHandler = () => {
    GetAttendanceList();  // Call the same function to fetch data on button click
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      {/* Flex container for alignment */}
      <div className="flex items-center gap-4 border rounded-lg shadow p-2">
        <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        <Button onClick={onSearchHandler}>Search</Button>
      </div>

      {/* Pass attendanceList to AttendanceGrid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} refreshData={GetAttendanceList} />
    </div>
  );
}

export default Attendance;
