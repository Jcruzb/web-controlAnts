import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpense, getExpenseById, updateExpense } from "../../Services/ExpenseService";
import { Box, Button, TextField, Typography, MenuItem, Select, Card, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategoriesList } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate, useParams } from "react-router";

const Expense = () => {
    const [categories, setCategories] = useState([]);
    const KIND = ['fijo', 'variable', 'extra'];
    const navigate = useNavigate();
    const { id } = useParams();

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
            startDate: '',
            plannedPayer: '',
            realPayer: '',
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
            startDate: Yup.date().when('kind', {
                is: 'fijo',
                then: schema => schema.required('Se requiere la fecha de inicio'),
                otherwise: schema => schema.notRequired()
            }),
            date: Yup.date().when('kind', {
                is: 'variable',
                then: schema => schema.required('Se requiere la fecha del gasto'),
                otherwise: schema => schema.notRequired()
            }),
            category: Yup.string().required('Se requiere la categoría del gasto'),
            expenseGroup: Yup.string().required('Se requiere indicar si el gasto es personal o familiar'),
            description: Yup.string()  // este campo es opcional, pero puede validarse según lo necesites
        }),
        onSubmit: (values, helpers) => {
            console.log('submit OK', values);
            console.log('entrando al submit', values);
            const payload = {
                ...values,
                startDate: values.kind === 'fijo' ? values.startDate : undefined,
                date: values.kind === 'variable' ? values.date : undefined,
                plannedPayer: values.plannedPayer || undefined,
                realPayer: values.realPayer || undefined
            };

            const action = id ? updateExpense(id, payload) : createExpense(payload);

            action
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

    useEffect(() => {
        if (id) {
            getExpenseById(id)
                .then((response) => {
                    formik.setValues({
                        ...response,
                        startDate: response.startDate || '',
                        date: response.date || '',
                        category: response.category?.id || '',
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const handleSelectChange = (event, name) => {
        const value = event.target.value;
        formik.setFieldValue(name, value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Typography variant="h4">{id ? "Editar Gasto" : "Agregar Gasto"}</Typography>
            </Box>
            <Card sx={{ width: '100%', maxWidth: 600, padding: 2, marginTop: 2 }}>
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

                    <FormControl fullWidth>
                        <InputLabel id="kind-label">Tipo</InputLabel>
                        <Select
                            id="kind"
                            name="kind"
                            labelId="kind-label"
                            label="Tipo"
                            value={formik.values.kind}
                            onChange={(e) => handleSelectChange(e, "kind")}
                        >
                            <MenuItem value="" disabled>Selecciona un tipo</MenuItem>
                            {KIND.map((kind) => (
                                <MenuItem key={kind} value={kind}>{kind}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {formik.errors.kind && <div>{formik.errors.kind}</div>}

                    {formik.values.kind === 'fijo' && (
                        <TextField
                            id="startDate"
                            label="Fecha de inicio"
                            variant="outlined"
                            type="date"
                            name="startDate"
                            onChange={formik.handleChange}
                            value={formik.values.startDate}
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                    {formik.values.kind === 'variable' && (
                        <TextField
                            id="date"
                            label="Fecha planeada"
                            variant="outlined"
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                    {formik.errors.date && <div>{formik.errors.date}</div>}

                    <FormControl fullWidth>
                        <InputLabel id="category-label">Categoría</InputLabel>
                        <Select
                            id="category"
                            name="category"
                            labelId="category-label"
                            label="Categoría"
                            value={formik.values.category}
                            onChange={(e) => handleSelectChange(e, "category")}
                        >
                            <MenuItem value="" disabled>Selecciona una categoría</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {formik.errors.category && <div>{formik.errors.category}</div>}

                    <FormControl fullWidth>
                        <InputLabel id="expenseGroup-label">Grupo de gastos</InputLabel>
                        <Select
                            id="expenseGroup"
                            name="expenseGroup"
                            labelId="expenseGroup-label"
                            label="Grupo de gastos"
                            value={formik.values.expenseGroup}
                            onChange={(e) => handleSelectChange(e, "expenseGroup")}
                        >
                            <MenuItem value="" disabled>Selecciona un grupo</MenuItem>
                            <MenuItem value="familiar">Familiar</MenuItem>
                            <MenuItem value="personal">Personal</MenuItem>
                        </Select>
                    </FormControl>
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
                        {id ? "Editar" : "Agregar"}
                    </Button>
                </form>
            </Card>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate("/expenses");
                }}
                modalTitle={id ? "Gasto Editado" : "¡Gasto Creado!"}
                modalBody={id ? "Gasto editado exitosamente" : "Gasto creado exitosamente"}
            />
        </Box>
    );
};

export default Expense;