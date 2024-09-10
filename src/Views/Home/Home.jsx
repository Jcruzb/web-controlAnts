import { Box, Card, Divider, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUsersList } from "../../Services/UsersService";
import PieCharts from "../../Components/Charts/PieCharts";


import { getIncomesList } from "../../Services/IncomeService";
import { getDebtsList } from "../../Services/DebtService"
import { date } from "yup";


const Home = () => {

    const [users, setUsers] = useState([]);
    const [incomes, setIncomes] = useState([])
    const [debts, setDebts] = useState([])
    const [debtsToShow, setDebtsToShow] = useState([])



    useEffect(() => {
        Promise.all([getUsersList(), getIncomesList(), getDebtsList()])
            .then(([usersResponse, incomesResponse, debtsResponse]) => {
                setUsers(usersResponse);
                setIncomes(incomesResponse);
                console.log(debtsResponse)
                setDebts(debtsResponse.map((debt) => {
                    return {
                        id: debt.id,
                        name: debt.name,
                        value: debt.amount,
                        date: debt.date
                    }
                }))
                setDebtsToShow(debtsResponse)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(incomes)
    console.log(debts)
    console.log(users)




    if (!users) {
        return <Box> Loading ...</Box>
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2 }}>
                <Typography variant="h3">Resumen de deudas</Typography>
            </Box>
            {/* <Box>
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
    <Divider /> */}
            <Box>
                <Typography variant="h4">Deudas</Typography>
                <PieCharts
                    otherData={debts}
                    width={200}
                    height={200}
                />
            </Box>
        </Box>

    );
}

export default Home;


/* 
         
*/