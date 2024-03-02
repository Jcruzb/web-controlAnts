import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { getCategoriesList } from "../../Services/CategoryService";

const Category = () => {

    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        getCategoriesList()
            .then((response) => {
                setCategorys(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'description', headerName: 'Descripcion', width: 500 },
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


        </Box>
    );
}

export default Category;