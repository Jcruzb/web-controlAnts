import { Box, Divider, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getUsersList } from "../../Services/UsersService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getIncomesList } from "../../Services/IncomeService";
import { getDebtsList } from "../../Services/DebtService"
import PieCharts from "../../Components/Charts/PieCharts";

const Home = () => {

    const today = new Date();

    const [users, setUsers] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [debts, setDebts] = useState([]);
    const [debtsData, setDebtsData] = useState([]);

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

    const formik = useFormik({
        initialValues: {
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            user: users.length > 0 ? users[0].id : ''
        },
        validationSchema: Yup.object({
            month: Yup.number().min(1, 'El mes debe ser mayor o igual a 1').max(12, 'El mes debe ser menor o igual a 12').required('El mes es requerido'),
            year: Yup.number().min(1900, 'El año debe ser mayor o igual a 1900').max(today.getFullYear(), 'El año no puede ser mayor al actual').required('El año es requerido'),
            user: Yup.string().required('El usuario es requerido')
        }),
        onSubmit: (values) => {
            console.log('Valores enviados:', values);
        }
    });

    useEffect(() => {
        const year = formik.values.year;
        const month = formik.values.month;

        const debtsPerYearMonth = debts.filter(debt => {
            const debtYear = new Date(debt.updatedAt).getFullYear();
            const debtMonth = new Date(debt.updatedAt).getMonth() + 1;
            return debtYear === year && debtMonth === month;
        });


        const debtDatatoShow = debtsPerYearMonth.map((debt, index) => ({
            id: index+1,
            value: debt.amount,
            label: debt.name
        }));


        setDebtsData(debtDatatoShow);
    }, [formik.values.year, formik.values.month, debts]);


  

    return (
        <Box className='Home'>
            <Box sx={{ display: 'flex', padding: 3, gap: 2 }}>
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
                <Select
                    name="user"
                    label="Usuario"
                    onChange={formik.handleChange}
                    value={formik.values.user}
                >
                    <MenuItem value="" disabled>Selecciona un usuario</MenuItem>
                    {users.map((user) => (
                        <MenuItem
                            key={user.id}
                            value={user.id}
                        >{user.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Divider />
            <Box>
                <PieCharts
                    otherData={debtsData? debtsData : []}
                    width={200}
                    height={200}
                />
            </Box>
        </Box>
    );
}

export default Home;
