// "use client";
// import GradeSelect from "@/app/_components/GradeSelect";
// import MonthSelection from "@/app/_components/MonthSelection";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import GlobalApi from "@/app/_services/GlobalApi";
// import moment from "moment";
// import AttendanceGrid from "./_components/AttendanceGrid";

// function Attendance() {
//   const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));  // Set default to current month
//   const [selectedGrade, setSelectedGrade] = useState(null);  // Set initial grade as null or a default grade
//   const [attendanceList, setAttendanceList] = useState([]);  // Initialize as empty array

//   // Moved GetAttendanceList outside
//   const GetAttendanceList = () => {
//     const month = moment(selectedMonth).format('MM/YYYY');  // Adjust format if needed
//     GlobalApi.GetAttendanceList(selectedGrade, month)
//       .then((resp) => {
//         console.log(resp.data);
//         setAttendanceList(resp.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching attendance data:", error);
//       });
//   };

//   useEffect(() => {
//     GetAttendanceList();  // Fetch attendance data on component mount
//   }, []);

//   const onSearchHandler = () => {
//     GetAttendanceList();  // Call the same function to fetch data on button click
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">Attendance</h2>

//       {/* Flex container for alignment */}
//       <div className="flex items-center gap-4 border rounded-lg shadow p-2">
//         <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
//         <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
//         <Button onClick={onSearchHandler}>Search</Button>
//       </div>

//       {/* Pass attendanceList to AttendanceGrid */}
//       <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} refreshData={GetAttendanceList} />
//     </div>
//   );
// }

// export default Attendance;


"use client";
import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import moment from "moment";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month'));  // Default to current month
  const [selectedGrade, setSelectedGrade] = useState(null);  // Initial grade as null
  const [attendanceList, setAttendanceList] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(false);  // Loading state for better user experience
  const [error, setError] = useState(null);  // Error state

  const GetAttendanceList = async () => {
    if (!selectedGrade) {
      setError("Please select a grade before fetching attendance.");
      return;
    }

    const month = moment(selectedMonth).format('MM/YYYY');  // Format month
    setLoading(true);  // Set loading state

    try {
      const resp = await GlobalApi.GetAttendanceList(selectedGrade, month);
      setAttendanceList(resp.data);
      setError(null);  // Clear previous errors
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Error fetching attendance data. Please try again later.");
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  useEffect(() => {
    GetAttendanceList();  // Fetch attendance data on component mount

    return () => {
      // Cleanup if necessary
      setAttendanceList([]); // Clear attendance list on unmount
    };
  }, []);

  const onSearchHandler = () => {
    GetAttendanceList();  // Fetch data on button click
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      {/* Flex container for alignment */}
      <div className="flex items-center gap-4 border rounded-lg shadow p-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
          <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
        <Button onClick={onSearchHandler} disabled={loading}>Search</Button>
      </div>


      {loading && <p>Loading attendance data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Pass attendanceList to AttendanceGrid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} refreshData={GetAttendanceList} />
    </div>
  );
}

export default Attendance;
