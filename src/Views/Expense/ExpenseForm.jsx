import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpense } from "../../Services/ExpenseService";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProductsList } from "../../Services/ProductService";
import { getCategoriesList } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";
import Select from '@mui/material/Select';
import { useNavigate } from "react-router";
import MenuItem from '@mui/material/MenuItem';


const Expense = () => {
    const [categories, setCategories] = useState([]);

    const KIND = [ 'fijo', 'variable', 'extra' ];
    
    const navigate = useNavigate();
    
    useEffect(() => {
        getCategoriesList()
            .then((response) => {
                setCategories(response);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            kind: '',
            date: '',
            category: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Se requiere el nombre del gasto'),
            amount: Yup.number().required('Se requiere el monto del gasto'),
            kind: Yup.string().min(2).max(50).required('Se requiere el tipo del gasto'),
            date: Yup.date().required('Se requiere la fecha del gasto'),
            category: Yup.string().required('Se requiere la categoria del gasto'),
        }),
        onSubmit: (values, helpers) => {
            createExpense(values)
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

    const handleSelectChange = (event, name) => {
        const value = event.target.value
        formik.setFieldValue(name, value);
    };
    
    console.log(formik.values);

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Agregar Gasto</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                    <TextField
                        id="amount"
                        label="Monto"
                        variant="outlined"
                        type="text"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                    />
                    {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                    <Select
                        id="kind"
                        name="kind"
                        label="Tipo"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleSelectChange(e, 'kind')}
                        value={formik.values.kind}
                    >
                        <MenuItem value="" disabled>Selecciona un tipo</MenuItem>
                        {KIND.map((kind) => {
                            return (
                                <MenuItem key={kind} value={kind}>{kind}</MenuItem>
                            )
                        })}
                    </Select>

                    {formik.errors.kind ? <div>{formik.errors.kind}</div> : null}
                    <TextField
                        id="date"
  
                        variant="outlined"
                        type="date"
                        name="date"
                        onChange={formik.handleChange}
                        value={formik.values.date}
                    />
                    {formik.errors.date ? <div>{formik.errors.date}</div> : null}
                    <Select
                        id="category"
                        name="category"
                        label="Categoria"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleSelectChange(e, 'category')}
                        value={formik.values.category}
                    >
                        <MenuItem value="" disabled>Selecciona una categoria</MenuItem>
                        {categories.map((category) => {
                            return (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            )
                        })}
                    </Select>
                    {formik.errors.category ? <div>{formik.errors.category}</div> : null}
                   

                    <Button onClick={formik.handleSubmit} variant="contained" type="submit">Agregar</Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false })
                    navigate('/expenses')
                }}
                modalTitle="Success"
                modalBody="Expense created successfully"
            />
        </Box>
    );
}

export default Expense;