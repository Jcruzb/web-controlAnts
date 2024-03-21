import { useFormik } from "formik";
import * as Yup from "yup";
import {  Box, Button,  MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsersList } from "../../Services/UsersService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate } from "react-router";
import { createDebt } from "../../Services/DebtService";


const DebtForm = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsersList()
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            quote: '',
            numberOfQuotes: '',
            amount: '',
            date: '',
            limitDate: '',
            user: '',
            payedUser: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Se requiere el nombre del producto'),
            quote: Yup.string().min(2).max(50).required('Se requiere la descripcion del producto'),
            numberOfQuotes: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
            amount: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
            date: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
            limitDate: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
            user: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
            payedUser: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
        }),
        onSubmit: (values, helpers) => {
            createDebt(values)
                .then((response) => {
                    console.log(response);
                    helpers.resetForm();
                    helpers.setStatus({ success: true });

                })
                .catch((error) => {
                    helpers.setStatus({ success: false });
                    console.log(error);
                    helpers.setErrors({ submit: error.response.data.message });
                    helpers.setSubmitting(false);
                });
        },
        status: { success: false }
    });

   
    return (
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h4">Agregar Deuda</Typography>
            </Box>

            <form onSubmit={formik.handleSubmit} style={{ display:'flex', flexDirection:'column', gap:2}}>
                <TextField
                    id="name"
                    name="name"
                    label="Nombre"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                <TextField
                    id="quote"
                    name="quote"
                    label="Cuota"
                    value={formik.values.quote}
                    onChange={formik.handleChange}
                    error={formik.touched.quote && Boolean(formik.errors.quote)}
                    helperText={formik.touched.quote && formik.errors.quote}
                />
                {formik.errors.quote ? <div>{formik.errors.quote}</div> : null}
                <TextField
                    id="numberOfQuotes"
                    name="numberOfQuotes"
                    label="Numero de cuotas"
                    value={formik.values.numberOfQuotes}
                    onChange={formik.handleChange}
                    error={formik.touched.numberOfQuotes && Boolean(formik.errors.numberOfQuotes)}
                    helperText={formik.touched.numberOfQuotes && formik.errors.numberOfQuotes}
                />
                {formik.errors.numberOfQuotes ? <div>{formik.errors.numberOfQuotes}</div> : null}
                <TextField
                    id="amount"
                    name="amount"
                    label="Monto"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                />
                {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                <TextField
                    id="date"
                    name="date"
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                />
                {formik.errors.date ? <div>{formik.errors.date}</div> : null}
                <TextField
                    id="limitDate"
                    name="limitDate"
                    type='date'
                    value={formik.values.limitDate}
                    onChange={formik.handleChange}
                    error={formik.touched.limitDate && Boolean(formik.errors.limitDate)}
                    helperText={formik.touched.limitDate && formik.errors.limitDate}
                />
                {formik.errors.limitDate ? <div>{formik.errors.limitDate}</div> : null}
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
                {formik.errors.user ? <div>{formik.errors.user}</div> : null}
                <Select
                    placeholder="Usuario que pago"
                    label="Usuario que pago"
                    name="payedUser"
                    onChange={formik.handleChange}
                    value={formik.values.payedUser}
                >
                    <MenuItem value="" disabled>Selecciona un usuario de pago</MenuItem>
                    {users.map((user) => (
                        <MenuItem
                            key={user.id}
                            value={user.id}
                        >{user.name}
                        </MenuItem>
                    ))}
                </Select>
                {formik.errors.payedUser ? <div>{formik.errors.payedUser}</div> : null}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >Agregar</Button>
            </form>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate('/debts')
                }}
                modalTitle="Deuda agregada"
                modalBody="La deuda ha sido agregada con exito"
            />
        </Box>

            
    )
}

export default DebtForm