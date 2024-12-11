import  { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Item {
    from: string;
    to: string;
    probability: string;
    humidity: string;
    clouds: string;
}

interface MyProp {
    itemsIn: Item[];
}

export default function TableWeather(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(props.itemsIn);
    }, [props.itemsIn]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hora de inicio</TableCell>
                        <TableCell align="right">Hora de fin</TableCell>
                        <TableCell align="right">Precipitación</TableCell>
                        <TableCell align="right">Humedad</TableCell>
                        <TableCell align="right">Nubosidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{row.from}</TableCell>
                            <TableCell align="right">{row.to}</TableCell>
                            <TableCell align="right">{row.probability}</TableCell>
                            <TableCell align="right">{row.humidity}</TableCell>
                            <TableCell align="right">{row.clouds}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
