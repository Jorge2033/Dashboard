import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import LineChartWeather from './components/LineChartWeather';
import BarChartWeather from './components/BarChartWeather';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import './App.css';

interface Indicator {
    title: string;
    subtitle: string;
    value: string;
    emoji?: string;
}

interface Item {
    from: string;
    to: string;
    probability: string;
    humidity: string;
    clouds: string;
}

function App() {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [isDayMode, setIsDayMode] = useState(true);
    const [items, setItems] = useState<Item[]>([]);

    const API_KEY = 'c413e0e271c5237ed79a3845fb0c1950'; 

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&appid=${API_KEY}`
            );
            if (!response.ok) throw new Error('Error fetching data');

            const data = await response.json();

            // Indicadores principales
            const indicatorsData: Indicator[] = [
                { title: 'CITY 🌍', subtitle: 'City', value: data.city.name },
                { title: 'LATITUDE 📍', subtitle: 'Degrees (°)', value: data.city.coord.lat.toString() },
                { title: 'LONGITUDE 📍', subtitle: 'Degrees (°)', value: data.city.coord.lon.toString() },
                
                { title: 'WIND SPEED 🌬️', subtitle: 'Km/h', value: `${(data.list[0].wind.speed * 3.6).toFixed(1)}` },
                { title: 'TEMPERATURE 🌡️', subtitle: '°C', value: `${(data.list[0].main.temp - 273.15).toFixed(1)}` },
            ];
            setIndicators(indicatorsData);

            // Tabla de pronóstico
            const itemsData = data.list.slice(0, 5).map((item: any) => ({
                from: item.dt_txt,
                to: item.dt_txt,
                probability: `${(item.pop * 100).toFixed(0)}%` || '0%',
                humidity: `${item.main.humidity}%`,
                clouds: `${item.clouds.all}%`,
            }));
            setItems(itemsData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            alert('Hubo un problema al obtener los datos. Intenta nuevamente.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Container className={`app-container ${isDayMode ? 'day-mode' : 'night-mode'}`}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold">
                    🌟 Weather Dashboard
                </Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" mr={2}>
                        Modo {isDayMode ? 'Día 🌞' : 'Noche 🌙'}
                    </Typography>
                    <Switch checked={isDayMode} onChange={() => setIsDayMode(!isDayMode)} />
                </Box>
            </Box>

            <Button className="update-button" onClick={handleReload}>
                🔄 Actualizar contenido
            </Button>

            <Grid container spacing={4}>
                {indicators.map((indicator, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={4}>
                        <IndicatorWeather
                            title={indicator.title}
                            subtitle={indicator.subtitle}
                            value={indicator.value}
                        />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4} mt={4}>
                <Grid item xs={12} sm={6}>
                    <LineChartWeather data={items.map((item) => ({ name: item.from, temperature: parseFloat(item.probability) }))} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BarChartWeather data={items.map((item) => ({ name: item.from, humidity: parseFloat(item.humidity) }))} />
                </Grid>
            </Grid>

            <Box mt={4}>
                <Typography variant="h5" align="center" gutterBottom>
                    Tabla de Pronóstico
                </Typography>
                <TableWeather itemsIn={items} />
            </Box>
            <Typography variant="caption" display="block" align="center" mt={4}>
                Copyright © Dashboard 2024
            </Typography>
        </Container>
    );
}

export default App;
