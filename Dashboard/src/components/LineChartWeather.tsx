
import Paper from '@mui/material/Paper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
    data: { name: string; temperature: number }[];
}

export default function LineChartWeather({ data }: Props) {
    return (
        <Paper sx={{ padding: 2, height: '400px' }}>
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
