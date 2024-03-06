import { Box, Button, Divider, Typography } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { deleteProduct, getProductsList } from "../../Services/ProductService";
import AlertModal from "../../Components/Modal/AlertModal";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getProductsList()
            .then((response) => {
                setProducts(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (e, params) => {
        console.log(params)
        const id = params.row.id;
        deleteProduct(id)
            .then((response) => {
                console.log(response);
                setProducts(products.filter((product) => product.id !== id));
                setOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    

    console.log(products);

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'description', headerName: 'Descripcion', width: 200 },
        {
            field: 'id', headerName: 'Acciones', width: 200, renderCell: (params) => {
                console.log(params);
                return (
                    <Box sx={{display:'flex', gap:1}}>
                        <Button href={`/product/edit/${params.value}`} variant="contained" color="primary">Editar</Button>
                        <Button onClick={(e) => handleDelete(e, params)} variant="contained" color="error">Eliminar</Button>
                    </Box>

                )
            }
        }
    ];

    const rows = products ? products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
        }
    }) : [];


    if (!products) {
        return <div>Loading...</div>
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Products</Typography>
                <Button href='/#/product/add' variant="contained" color="primary">Agregar Producto</Button>
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
            modalTitle="Eliminado"
            modalBody="Producto eliminado con exito"              
            />


        </Box>
    );
}

export default Products;