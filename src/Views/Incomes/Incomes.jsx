import { useEffect, useState } from "react";
import { deleteIncome, getIncomesList } from "../../Services/IncomeService";
import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import AlertModal from "../../Components/Modal/AlertModal";
import { formatDate } from "../../utils/funtions";

const Income = () => {
    const [income, setIncome] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getIncomesList()
            .then((response) => {
                setIncome(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (e, id) => {
        deleteIncome(id)
            .then(() => {
                setIncome(income.filter(item => item.id !== id));
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const columns = [
        { field: 'user', headerName: 'Usuario', width: 300 },
        { field: 'source', headerName: 'Fuente de ingreso', width: 200 },
        { field: 'amount', headerName: 'Monto', width: 150 },
        { field: 'frequency', headerName: 'Frecuencia', width: 150 },
        { field: 'date', headerName: 'Fecha', width: 150 },
        {
            field: 'id',
            headerName: 'Acciones',
            width: 400,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/#/income/edit/${params.value}`} variant="contained" color="primary">
                            Editar
                        </Button>
                        <Button onClick={(e) => handleDelete(e, params.value)} variant="contained" color="error">
                            Eliminar
                        </Button>
                    </Box>
                );
            }
        }
    ];

    const rows = income.map((item) => ({
        id: item.id,
        user: item.responsable?.name || "Sin usuario",
        source: item.source,
        amount: item.amount,
        frequency: item.frequency,
        date: item.frequency==='Único' ? formatDate(item.date) : ''
    }));

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Typography variant="h4">Ingresos</Typography>
                <Button href="/#/income/add" variant="contained" color="primary">Agregar</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ marginTop: 3 }}>
                <DataTable rows={rows} columns={columns} />
            </Box>
            <AlertModal
                open={open}
                onClose={() => setOpen(false)}
                modalTitle="Eliminado"
                modalBody="Ingreso eliminado"
            />
        </Box>
    );
};

export default Income;