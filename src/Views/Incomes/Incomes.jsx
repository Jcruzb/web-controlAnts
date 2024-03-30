import { useEffect, useState } from "react";
import { deleteIncome, getIncomesList } from "../../Services/IncomeService";
import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import AlertModal from "../../Components/Modal/AlertModal";
import { formatDate } from "../../utils/funtions"

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

    const handleDelete = (e, params) => {

        const id = params
        deleteIncome(id)
            .then((response) => {
                console.log(response)
                setIncome(income.filter(income => income.id != id))
                setOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        { field: 'user', headerName: 'Usuario', width: 300 },
        { field: 'source', headerName: 'Fuente de ingreso', width: 150 },
        { field: 'amount', headerName: 'Monto', width: 150 },
        { field: 'frecuency', headerName: 'Fecha', width: 150 },
        {
            field: 'id', headerName: 'Acciones', width: 400, renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/income/edit/${params.value}`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params.value)} variant="contained" color="error">Eliminar</Button>
                    </Box>
                )
            }
        }
    ];

    console.log(income)

    const rows = income.map((item) => {

        return {
            id: item.id,
            user: item.user.name,
            source: item.source,
            amount: item.amount,
            frecuency: item.frecuency === "Mensual" ? item.frecuency : formatDate(item.updatedAt)
        };
    });


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Ingresos</Typography>
                <Button href="/#/income/add" variant="contained" color="primary">Agregar</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ marginTop: 3 }}>
                <DataTable
                    rows={rows}
                    columns={columns}
                />
            </Box>
            <AlertModal
                open={open}
                onClose={() => { setOpen(false) }}
                modalTitle={"Eliminado"}
                modalBody={"Ingreso eliminado"}
            />
        </Box>
    );
}

export default Income;
