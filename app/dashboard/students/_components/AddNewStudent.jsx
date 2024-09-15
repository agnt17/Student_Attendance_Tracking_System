"use client"
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function AddNewStudent({refreshData}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(new AbortController()); // Reference to the AbortController

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const abortController = new AbortController(); // Create a new AbortController for this request
    abortControllerRef.current = abortController; // Update the ref with the new controller

    try {
      const resp = await GlobalApi.CreateNewStudent(data, { signal: abortController.signal });
      console.log("Student added successfully", resp);
      if (resp.data) {
        reset();
        refreshData();
        setOpen(false);
        toast("New Student Added!");
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error("Error adding student:", error);
        toast.error("Failed to add student");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    abortControllerRef.current.abort(); // Abort any ongoing request
  };

  return (
    <div>
      <Button className="text-white" onClick={() => setOpen(true)}>
        +Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="Ex. Akanksha Verma"
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="flex flex-col py-2">
                  <label>Select Year</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade")}
                  >
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="Final">Final Year</option>
                  </select>
                </div>

                <div className="flex flex-col py-2">
                  <label>Select Branch</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("branch")}
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ET">ET</option>
                    <option value="EE">EE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="CHE">CHE</option>
                    <option value="PT">PT</option>
                    <option value="PL">PL</option>
                    <option value="OT">OT</option>
                    <option value="FT">FT</option>
                    <option value="BCE">BCE</option>
                    <option value="LT">LT</option>
                  </select>
                </div>

                <div className="py-2">
                  <label>Contact Number</label>
                  <Input placeholder="Hint ? Arrange these 1234567890" {...register("contact")} />
                </div>

                <div className="py-2">
                  <label>Address</label>
                  <Input placeholder="Inside My ❤️" {...register("address")} />
                </div>

                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-800 text-white"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="text-white"
                  >
                    {loading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
