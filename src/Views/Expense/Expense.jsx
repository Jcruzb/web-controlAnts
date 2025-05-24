import { useEffect, useState } from "react";
import { deleteExpense, getExpensesList } from "../../Services/ExpenseService";
import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import AlertModal from "../../Components/Modal/AlertModal";

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getExpensesList()
            .then((response) => {
                console.log(response)
                setExpenses(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (e, params) => {
        const id = params.row.id;
        deleteExpense(id)
            .then(() => {
                setExpenses(expenses.filter((expense) => expense.id !== id));
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DateFormat = (date) => {
        if (!date) return '';
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'description', headerName: 'Descripción', width: 200 },
        { field: 'amount', headerName: 'Monto', width: 100 },
        { field: 'kind', headerName: 'Tipo', width: 100 },
        { field: 'category', headerName: 'Categoría', width: 100 },
        { field: 'fecha', headerName: 'Fecha', width: 100 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/#/expense/${params.row.id}/edit`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>
                );
            }
        }
    ];

    if (expenses.length === 0) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: 2 }}>
                <Typography variant="h4">No hay gastos registrados</Typography>
                <Button href="/#/expenses/add" variant="contained" color="primary">Agregar</Button>
            </Box>
        );
    }

    const rows = expenses.map((expense) => ({
        id: expense.id,
        name: expense.name, // Se agrega el nombre aquí
        description: expense.description,
        amount: expense.amount,
        kind: expense.kind,
        category: expense?.category?.name || '',
        fecha: DateFormat(
            expense.kind === 'fijo' ? expense.startDate : expense.date
        ),
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Gastos</Typography>
                <Button href="/#/expenses/add" variant="contained" color="primary">Agregar</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <DataTable columns={columns} rows={rows} />
            <AlertModal
                open={open}
                onClose={() => setOpen(false)}
                modalTitle="Success"
                modalBody="Expense deleted successfully"
            />
        </Box>
    );
};

export default Expense;