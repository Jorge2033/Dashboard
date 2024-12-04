import React from 'react';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '2024-12-01', uv: 8 },
    { name: '2024-12-02', uv: 9 },
    { name: '2024-12-03', uv: 7 },
    { name: '2024-12-04', uv: 10 },
    { name: '2024-12-05', uv: 6 },
];

export default function BarChartWeather() {
    return (
        <Paper
            sx={{
                padding: 2,
                height: '400px',
                backgroundColor: '#fff',
                borderRadius: '8px',
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}
