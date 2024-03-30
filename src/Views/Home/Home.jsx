import { Box, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUsersList } from "../../Services/UsersService";


import { getIncomesList } from "../../Services/IncomeService";
import { getDebtsList } from "../../Services/DebtService"


const Home = () => {

    const [users, setUsers] = useState([]);
    const [incomes, setIncomes] = useState([])
    const [debts, setDebts] = useState([])


    useEffect(() => {
        Promise.all([getUsersList(), getIncomesList(), getDebtsList()])
            .then(([usersResponse, incomesResponse, debtsResponse]) => {
                setUsers(usersResponse);
                setIncomes(incomesResponse);
                setDebts(debtsResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(incomes)
    console.log(debts)
    



    if (!users) {
        return <Box> Loading ...</Box>
    }

    return (
        <Box className='Home'>
            <Box>
                <Typography variant="h4">Resumen</Typography>
            </Box>
            <Box>
                {
                    users.map((user) => {
                        return (
                            <Card key={user.id}>
                                <Typography variant="h5">{user.name}</Typography>
                            </Card>
                        );
                    })
                }

            </Box>

        </Box>
    );
}

export default Home;


/* 
          <Box sx={{ display: 'flex', flexDirection:'column', padding: 3, gap: 2 }}>
                <Typography variant="h3">Resumen de deudas</Typography>
                <Box>
                    <TextField
                        id="month"
                        label="Mes"
                        variant="outlined"
                        type="number"
                        name="month"
                        value={formik.values.month}
                        onChange={formik.handleChange}
                        error={formik.touched.month && Boolean(formik.errors.month)}
                        helperText={formik.touched.month && formik.errors.month}
                    />
                    <TextField
                        id="year"
                        label="Año"
                        variant="outlined"
                        type="number"
                        name="year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        error={formik.touched.year && Boolean(formik.errors.year)}
                        helperText={formik.touched.year && formik.errors.year}
                    />
                    <InputLabel htmlFor="user">Usuario</InputLabel>
                    <Select
                        name="user"
                        label="Usuario"
                        onChange={formik.handleChange}
                        value={formik.values.user}
                        sx={{ minWidth: 300 }}
                        defaultValue="Usuario" 
                    >
                        <MenuItem value="" disabled>Selecciona el usuario</MenuItem> 
                        {users.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >{user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
            <Divider />
            <Box>
                <PieCharts
                    otherData={debtsData ? debtsData : []}
                    width={200}
                    height={200}
                />
            </Box>
*/