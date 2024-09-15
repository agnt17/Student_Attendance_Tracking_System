"use Client"
import React from "react";

function GradeSelect({selectedGrade}) {
  return (
    <div className="">
      <div className="flex flex-col py-2">
        <select className="p-3 border rounded-lg" onChange={(e)=>selectedGrade(e.target.value)}>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="Final">Final Year</option>
        </select>
      </div>
    </div>
  );
}
export default GradeSelect;
