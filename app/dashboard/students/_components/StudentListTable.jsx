import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import GlobalApi from "@/app/_services/GlobalApi";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({ studentList, refreshData }) {
  // Function to handle Delete
  const DeleteRecord = (id) => {
    GlobalApi.DeleteStudentRecord(id)
      .then(resp => {
        if (resp) {
          toast('Record Deleted Successfully');
          // Trigger the refreshData callback to update the student list
          refreshData();
        }
      })
      .catch(err => {
        toast.error("Failed to delete the record");
      });
  };

  // Custom Button component to render action buttons
  const CustomButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => DeleteRecord(props?.data?.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  // Column definitions for the table
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "grade", filter: true },
    { field: "branch", filter: true },
    { field: "contact", filter: true },
    { field: "address", filter: true },
    { field: "action", cellRenderer: CustomButtons },
  ]);

  // Data and search state
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  return (
    <div className="my-7">
      <div className="ag-theme-quartz-auto-dark" style={{ height: 500 }}>
        {/* Search Input */}
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <Search />
          <input
            type="text"
            placeholder="Search on Anything..."
            className="outline-none w-full"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        {/* AG Grid Table */}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div> 
    </div>
  );
}

export default StudentListTable;
