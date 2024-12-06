
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface IndicatorProps {
    title: string;
    subtitle: string;
    value: string;
}

export default function IndicatorWeather({ title, subtitle, value }: IndicatorProps) {
    return (
        <Paper
            sx={{
                padding: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="h6" color="primary">
                {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
            <Typography variant="body2" color="text.secondary">
                {subtitle}
            </Typography>
        </Paper>
    );
}
