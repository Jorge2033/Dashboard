import React from 'react';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartWeatherProps {
    data: { name: string; humidity: number }[];
}

const BarChartWeather: React.FC<BarChartWeatherProps> = ({ data }) => {
    return (
        <Paper
            sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="humidity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default BarChartWeather;