import { Box, Button, Divider, Typography } from "@mui/material"


function Incomes() {
  return (
    <Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                <Typography variant="h4">Ingresos</Typography>
                <Button href="/#/income/add" variant="contained" color="primary">Agregar</Button>
            </Box>
            <Divider sx={{ marginTop: 3 }} />

      
    </Box>
  )
}

export default Incomes
