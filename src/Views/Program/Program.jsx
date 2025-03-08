import { useEffect, useState } from "react";

import { getProgramByDate } from "../../Services/ProgramService";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Box, Card, MenuItem, Select, TextField, Typography } from "@mui/material";
import ProgramTable from "../../Components/ProgramTable/ProgramTable";

const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

const Program = () => {

    const { user } = useAuthContext();
    const [program, setProgram] = useState({
        error: false,
    });
    const [date, setDate] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.family.id) { // Asegúrate de que el id de la familia existe
            setLoading(true);
            getProgramByDate(user.family.id, date.month, date.year)
                .then((program) => {
                    setProgram(program);
                    setLoading(false);
                })
                .catch(() => {
                    setProgram({ error: true });
                    setLoading(false);
                })
        }
    }, [user, date]);

    console.log(program.expenses)

    const handleChange = (event, name) => {
        setDate(
            {
                ...date,
                [name]: event.target.value,
            }
        );
    };



    if (loading ) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <Box>
            <Card sx={{ padding: 2, gap: 2 }}>
                <Select value={date.month} onChange={(e) => handleChange(e, 'month')}>
                    {months.map(month => (
                        <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                    ))}
                </Select>
                <TextField
                    id="year"
                    label="año"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={date.year}
                    onChange={(e) => handleChange(e, 'year')}
                />
            </Card>
            {!program.error ? (
                <Card sx={{ padding: 2, gap: 2 }}>
                    <Typography variant="h4">Programa de {program.month} de {program.year}</Typography>
                    <Typography variant="h6">Actividades:</Typography>
                    <ProgramTable rows={program.expenses} />

                </Card>
            ) : (
                <Typography variant="h4">No hay programa para el mes seleccionado</Typography>
            )}

        </Box>
    );
}
export default Program;