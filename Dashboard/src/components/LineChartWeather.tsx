import React from 'react';
import Paper from '@mui/material/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '2024-12-01', temperature: 24 },
    { name: '2024-12-02', temperature: 25 },
    { name: '2024-12-03', temperature: 23 },
    { name: '2024-12-04', temperature: 26 },
    { name: '2024-12-05', temperature: 24 },
];

export default function LineChartWeather() {
    return (
        <Paper
            sx={{
                padding: 2,
                height: '400px',
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}
