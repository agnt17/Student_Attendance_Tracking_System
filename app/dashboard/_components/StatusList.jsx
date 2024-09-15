import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { getUniqueRecord } from '@/app/_services/service';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList }) {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      const totalSt = getUniqueRecord(attendanceList);
      setTotalStudent(totalSt.length);

      const today = Number(moment().format('D'));
      if (totalSt.length > 0 && today > 0) {
        const presentPercentage = (attendanceList.length / (totalSt.length * today)) * 100;
        setPresentPerc(presentPercentage); // Update presentPerc state
        console.log(presentPercentage);
      }
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card icon={<GraduationCap />} title="Total Students" value={totalStudent} />
      <Card icon={<TrendingUp />} title="Total Present (Percentage)" value={presentPerc.toFixed(1) + "%"} />
      <Card icon={<TrendingDown />} title="Total Down (Percentage)" value={(100 - presentPerc).toFixed(1) +"%"} />
    </div>
  );
}

export default StatusList;
