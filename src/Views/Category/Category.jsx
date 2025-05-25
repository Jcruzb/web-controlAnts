import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { deleteCategory, getCategoriesList } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";

const Category = () => {

    const [categorys, setCategorys] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCategoriesList()
            .then((response) => {
                setCategorys(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    const handleDelete = (e, params) => {
        const id = params.row.id;
        deleteCategory(id)
            .then(() => {
                setCategorys(categorys.filter((cat) => cat.id !== id));
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'description', headerName: 'Descripcion', width: 500 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button href={`/#/category/${params.row.id}/edit`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>
                );
            }
        }
    ];

    const rows = categorys ? categorys.map((category) => {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
        }
    }) : [];

    if (!categorys) {
        return <div>Loading...</div>
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Categorys</Typography>
                <Button href='/#/category/add' variant="contained" color="primary">Agregar Categoria</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box>
                <DataTable
                rows = {rows}
                columns = {columns}
                />
            </Box>

            <AlertModal
                open={open}
                onClose={() => setOpen(false)}
                modalTitle="Success"
                modalBody="Category deleted successfully"
            />

        </Box>
    );
}

export default Category;