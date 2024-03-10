import { Box, Button, Divider, Snackbar, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { deleteUser, getUsersList } from "../../Services/UsersService"
import { useAuthContext } from "../../Contexts/AuthContext"

const Users = () => {

    const { user } = useAuthContext()

    console.log(user)

    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUsersList()
            .then((response) => {
                setUsers(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleDelete = (e, params) => {
        console.log(params)
        const id = params.row.id
        deleteUser(id)
            .then((response) => {
                console.log(response)
                setUsers(users.filter((user) => user.id !== id))
                setOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'id', headerName: 'Acciones', width: 200, renderCell: (params) => {
                console.log(params)
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/user/edit/${params.value}`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>

                )
            }
        }
    ]

    const rows = users ? users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }) : [];

    if (!users) {
        return <div>Loading...</div>
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Usuarios</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Button href="/#/user/add" variant="contained" color="primary">Agregar</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Usuario eliminado"
            />
        </Box>
            )
    }

            export default Users