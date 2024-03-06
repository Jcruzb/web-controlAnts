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
                setExpenses(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (e, params) => {
        console.log(params)
        const id = params.row.id;
        deleteExpense(id)
            .then((response) => {
                console.log(response);
                setExpenses(expenses.filter((expense) => expense.id !== id));
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const DateFormat = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'amount', headerName: 'Monto', width: 200 },
        { field: 'kind', headerName: 'Tipo', width: 200 },
        { field: 'product', headerName: 'Producto', width: 200 },
        { field: 'category', headerName: 'Categoria', width: 200 },
        { field: 'date', headerName: 'Fecha', width: 200 },
        {
            field: 'id', headerName: 'Acciones', width: 200, renderCell: (params) => {
                console.log(params);
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/expense/edit/${params.value}`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>

                )
            }
        }
    ];

    const rows = expenses ? expenses.map((expense) => {
        return {
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            kind: expense.kind,
            product: expense.product.name,
            category: expense.category.name,
            date: DateFormat(expense.date),
        }
    }) : [];




    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center', gap: 2, marginTop: 2 }}>
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
}
export default Expense;