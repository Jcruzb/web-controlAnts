import { Box, Button, Divider, Typography } from "@mui/material";

const Category = () => {
    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Categorys</Typography>
                <Button href='/#/category/add' variant="contained" color="primary">Agregar Categoria</Button>
            </Box>
            <Divider sx={{marginTop:3}} />


        </Box>
    );
}

export default Category;