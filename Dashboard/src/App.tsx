import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IndicatorWeather from './components/IndicatorWeather';
import LineChartWeather from './components/LineChartWeather';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import './App.css';

interface Indicator {
    title: string;
    subtitle: string;
    value: string;
}

function App() {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [isDayMode, setIsDayMode] = useState(true);
    const [owm, setOWM] = useState(localStorage.getItem('openWeatherMap') || '');

    const fetchData = async () => {
        const API_KEY = 'c413e0e271c5237ed79a3845fb0c1950'; 
        const nowTime = new Date().getTime();
        const expiringTime = localStorage.getItem('expiringTime');

        if (!expiringTime || nowTime > parseInt(expiringTime)) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
                );
                const savedTextXML = await response.text();

                // Guardar en localStorage
                const expirationDelay = 1 * 3600000; // Expira en 1 hora
                localStorage.setItem('openWeatherMap', savedTextXML);
                localStorage.setItem('expiringTime', (nowTime + expirationDelay).toString());

                setOWM(savedTextXML);
                parseXML(savedTextXML);
            } catch (error) {
                console.error('Error al obtener datos de OpenWeatherMap:', error);
            }
        } else {
            // Si los datos están en caché, procesarlos
            if (owm) {
                parseXML(owm);
            }
        }
    };

    const parseXML = (xmlString: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const extractedData: Indicator[] = [];

        const cityName = xml.getElementsByTagName('name')[0]?.textContent || 'Unknown City';
        extractedData.push({ title: 'TIMEZONE', subtitle: 'America/Guayaquil', value: cityName });

        const location = xml.getElementsByTagName('location')[1];
        if (location) {
            const latitude = location.getAttribute('latitude') || 'Unknown';
            const longitude = location.getAttribute('longitude') || 'Unknown';
            const altitude = location.getAttribute('altitude') || 'Unknown';

            extractedData.push({ title: 'ELEVATION', subtitle: 'm', value: altitude });
            extractedData.push({ title: 'LATITUDE', subtitle: 'Degrees', value: latitude });
            extractedData.push({ title: 'LONGITUDE', subtitle: 'Degrees', value: longitude });
        }

        const windSpeed = xml.getElementsByTagName('windSpeed')[0]?.getAttribute('mps') || 'Unknown';
        extractedData.push({ title: 'WIND SPEED', subtitle: 'Km/h', value: `${(parseFloat(windSpeed) * 3.6).toFixed(1)}` });

        const temperature = xml.getElementsByTagName('temperature')[0]?.getAttribute('value') || 'Unknown';
        extractedData.push({ title: 'TEMPERATURE', subtitle: '°C', value: `${parseFloat(temperature).toFixed(1)}` });

        setIndicators(extractedData);
    };

    useEffect(() => {
        fetchData();
    }, [owm]);

    const renderIndicators = () => {
        return indicators.map((indicator, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={3}>
                <IndicatorWeather
                    title={indicator.title}
                    subtitle={indicator.subtitle}
                    value={indicator.value}
                />
            </Grid>
        ));
    };

    const toggleDayNightMode = () => {
        setIsDayMode(!isDayMode);
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                backgroundColor: isDayMode ? '#fff' : '#121212',
                color: isDayMode ? '#000' : '#fff',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Switch checked={isDayMode} onChange={toggleDayNightMode} />
            <Typography variant="caption">Modo {isDayMode ? 'Día' : 'Noche'}</Typography>
            <Button variant="contained" color="primary" onClick={fetchData} sx={{ margin: '20px 0' }}>
                Actualizar contenido
            </Button>
            <Grid container spacing={4}>
                {renderIndicators()}
            </Grid>
            <Grid container spacing={4} mt={4}>
                <Grid item xs={12} sm={6}>
                    <LineChartWeather />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
