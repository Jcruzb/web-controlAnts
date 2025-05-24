import { useEffect, useState } from "react";

import { getVirtualProgramByDate } from "../../Services/ProgramService";
import { useAuthContext } from "../../Contexts/AuthContext";
import { Box, Card, MenuItem, Select, TextField, Typography } from "@mui/material";
import ProgramTable from "../../Components/ProgramTable/ProgramTable";
import ProgramExpenseTable from "../../Components/ProgramTable/ProgramExpenseTable";

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
        month: null,
        year: null,
        family: '',
        expenses: [],
        debts: [],
        error: false,
    });
    const [date, setDate] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.family.id) { // Asegúrate de que el id de la familia existe
            console.log('Solicitando programa para mes:', date.month, 'año:', date.year);
            setLoading(true);
            getVirtualProgramByDate(user.family.id, date.month, date.year)
                .then((response) => {
                    console.log(response)
                    setProgram(response);
                    setLoading(false);
                })
                .catch(() => {
                    setProgram({ error: true });
                    setLoading(false);
                })
        }
    }, [user.family.id, date.month, date.year]);

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
                    <Typography variant="h6">Gastos:</Typography>
                    <ProgramExpenseTable rows={program.expenses} />
                    <Typography variant="h6" sx={{ mt: 3 }}>Deudas:</Typography>
                    <ProgramTable rows={program.debts} />
                </Card>
            ) : (
                <Typography variant="h4">No hay programa para el mes seleccionado</Typography>
            )}

        </Box>
    );
}
export default Program;