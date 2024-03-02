import { Box, TextField, Typography } from "@mui/material";

const ProductsForm = () => {
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Agregar Producto</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <TextField id="name" label="Nombre" variant="outlined" />
            </Box>
        </Box>
    );
}

export default ProductsForm;