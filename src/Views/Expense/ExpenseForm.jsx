import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpense } from "../../Services/ExpenseService";
import { Box, Button, Divider, TextField, Typography, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategoriesList } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate } from "react-router";

const Expense = () => {
    const [categories, setCategories] = useState([]);
    const KIND = ['fijo', 'variable', 'extra'];
    const navigate = useNavigate();
    
    useEffect(() => {
        getCategoriesList()
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            expenseGroup: '',
            kind: '',
            date: '',
            category: '',
            description: ''  // nuevo campo para la descripción
        },
        validationSchema: Yup.object({
            name: Yup.string()
                     .min(2, 'El nombre es muy corto')
                     .max(50, 'El nombre es muy largo')
                     .required('Se requiere el nombre del gasto'),
            amount: Yup.number().required('Se requiere el monto del gasto'),
            kind: Yup.string()
                     .min(2, 'El tipo es muy corto')
                     .max(50, 'El tipo es muy largo')
                     .required('Se requiere el tipo del gasto'),
            date: Yup.date().required('Se requiere la fecha del gasto'),
            category: Yup.string().required('Se requiere la categoría del gasto'),
            expenseGroup: Yup.string().required('Se requiere indicar si el gasto es personal o familiar'),
            description: Yup.string()  // este campo es opcional, pero puede validarse según lo necesites
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
        const value = event.target.value;
        formik.setFieldValue(name, value);
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Agregar Gasto</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 2 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && <div>{formik.errors.name}</div>}
                    
                    <TextField
                        id="amount"
                        label="Monto"
                        variant="outlined"
                        type="number"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                    />
                    {formik.errors.amount && <div>{formik.errors.amount}</div>}
                    
                    <Select
                        id="kind"
                        name="kind"
                        label="Tipo"
                        variant="outlined"
                        onChange={(e) => handleSelectChange(e, "kind")}
                        value={formik.values.kind}
                    >
                        <MenuItem value="" disabled>Selecciona un tipo</MenuItem>
                        {KIND.map((kind) => (
                            <MenuItem key={kind} value={kind}>{kind}</MenuItem>
                        ))}
                    </Select>
                    {formik.errors.kind && <div>{formik.errors.kind}</div>}
                    
                    <TextField
                        id="date"
                        variant="outlined"
                        type="date"
                        name="date"
                        onChange={formik.handleChange}
                        value={formik.values.date}
                    />
                    {formik.errors.date && <div>{formik.errors.date}</div>}
                    
                    <Select
                        id="category"
                        name="category"
                        label="Categoría"
                        variant="outlined"
                        onChange={(e) => handleSelectChange(e, "category")}
                        value={formik.values.category}
                    >
                        <MenuItem value="" disabled>Selecciona una categoría</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    {formik.errors.category && <div>{formik.errors.category}</div>}
                    
                    <Select
                        id="expenseGroup"
                        name="expenseGroup"
                        label="Grupo de gastos"
                        variant="outlined"
                        onChange={(e) => handleSelectChange(e, "expenseGroup")}
                        value={formik.values.expenseGroup}
                    >
                        <MenuItem value="" disabled>Selecciona un grupo</MenuItem>
                        <MenuItem value="familiar">Familiar</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                    </Select>
                    {formik.errors.expenseGroup && <div>{formik.errors.expenseGroup}</div>}
                    
                    <TextField
                        id="description"
                        label="Descripción"
                        variant="outlined"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        multiline
                        rows={4}
                    />
                    {formik.errors.description && <div>{formik.errors.description}</div>}
                    
                    <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                        Agregar
                    </Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate("/expenses");
                }}
                modalTitle="Éxito"
                modalBody="El gasto se creó correctamente"
            />
        </Box>
    );
};

export default Expense;