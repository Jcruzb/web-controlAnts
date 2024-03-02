import { Box, Button, Divider, Typography } from "@mui/material";

const Products = () => {

    

    return (
        <Box sx={{width:'100%'}}>
            <Box sx={{display:"flex", justifyContent:"space-around", alignItems:'center'  }}>
                <Typography variant="h4">Products</Typography>
                <Button href='/#/product/add' variant="contained" color="primary">Agregar Producto</Button>
            </Box>
            <Divider sx={{marginTop:3}} />

        </Box>
    );
}

export default Products;