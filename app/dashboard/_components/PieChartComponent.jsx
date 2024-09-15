import { getUniqueRecord } from '@/app/_services/service';
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

import moment from 'moment';
function PieChartComponent({ attendanceList }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (attendanceList && attendanceList.length > 0) {
            const totalSt = getUniqueRecord(attendanceList);

            const today = Number(moment().format('D'));
            const presentPercentage = (attendanceList.length / (totalSt.length * today)) * 100;
            setData([
                {
                    name: 'Total Present',
                    value: Number(presentPercentage.toFixed(1)),
                    fill:"#8884d8"
                },
                {
                    name: 'Total Absent',
                    value:Number(100 - presentPercentage.toFixed(1)),
                    fill:"#82ca9d"
                },
            ])
        }
    }, [attendanceList]);
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Monthly Attendance Pie Chart</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
