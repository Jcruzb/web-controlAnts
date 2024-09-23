import { useEffect, useState } from "react"
import { deleteDebt, getDebtsList } from "../../Services/DebtService"
import { Box, Button, Divider, Typography } from "@mui/material"
import DataTable from "../../Components/DataTable/DataTable"
import AlertModal from "../../Components/Modal/AlertModal"

const Debt = () => {

    const [debt, setDebt] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getDebtsList()
            .then((response) => {
                setDebt(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log(debt)

    const handleDelete = (e, params) => {
        console.log(params)
        const id = params.row.id
        deleteDebt(id)
            .then((response) => {
                console.log(response)
                setDebt(debt.filter((debt) => debt.id !== id))
                setOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'quote', headerName: 'Cuota', width: 200 },
        { field: 'pays', headerName: 'Pagos', width: 200},
        {field: 'amount', headerName: 'Monto', width: 200},
        {
            field: 'id', headerName: 'Acciones', width: 200, renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/debt/edit/${params.value}`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>

                )
            }
        }
    ]

    const rows = debt ? debt.map((debt) => {
        return {
            id: debt.id,
            name: debt.name,
            quote: debt.quote,
            pays: debt.pays.length,
            amount: debt.amount
        }
    }) : [];



    if (!debt) {
        return <div>Loading...</div>
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Debt</Typography>
                <Button href="/#/debt/add" variant="contained" color="primary">Agregar</Button>
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
                modalBody={"Deuda eliminada"}
            />


        </Box>
    );
}

export default Debt;