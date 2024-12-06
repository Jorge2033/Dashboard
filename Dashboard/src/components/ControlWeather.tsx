import  { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

export default function ControlWeather() {
    // Hooks para estado y referencia
    const [, setSelected] = useState(-1);
    const descriptionRef = useRef<HTMLDivElement>(null);

    // Datos para las opciones del selector
    const items = [
        { name: 'Precipitación', description: 'Cantidad de agua que cae sobre una superficie.' },
        { name: 'Humedad', description: 'Cantidad de vapor de agua en el aire.' },
        { name: 'Nubosidad', description: 'Grado de cobertura del cielo por nubes.' },
    ];

    // Manejador del evento de cambio
    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value);
        setSelected(idx);

        // Actualiza el contenido de la referencia
        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = idx >= 0 ? items[idx]["description"] : "";
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue="-1"
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>
                            Seleccione una variable
                        </MenuItem>
                        {items.map((item, key) => (
                            <MenuItem key={key} value={key}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Descripción actualizada dinámicamente */}
            <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />
        </Paper>
    );
}
