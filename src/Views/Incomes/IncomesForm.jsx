import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { createIncome } from "../../Services/IncomeService";
import AlertModal from "../../Components/Modal/AlertModal";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const IncomeForm = () => {

    const FRECUENCY = ['Mensual', 'Único']

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            source: '',
            amount: '',
            frecuency: ''
        },
        validationSchema: Yup.object({
            source: Yup.string().min(2).max(50).required('Se requiere registrar la fuente de ingresos'),
            amount: Yup.number().min(0, 'el ingreso debe ser mayor a cero').required('Se requiere el monto'),
            frecuency: Yup.string().min(2).max(50).required('Se requiere la frecuencia del ingreso').oneOf(FRECUENCY)
        }),
        onSubmit: ((values, helpers) => {
            console.log('entra al submit')
            createIncome(values)
                .then((response) => {
                    console.log(response);
                    console.log('entra')
                    helpers.resetForm();
                    helpers.setStatus({ success: true });
                })
                .catch((error) => {
                    console.log('error')
                    helpers.setStatus({ success: false });
                    console.log(error);
                    helpers.setErrors({ submit: error.response.data.message });
                    helpers.setSubmitting(false);
                });
        }),
        status: { success: false }
    })

    const handleCategoryChange = (event) => {
        const value = event.target.value
        formik.setFieldValue('frecuency', value);
    };


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Agregar Ingreso</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <TextField
                        id="source"
                        label="Fuente de ingreso"
                        variant="outlined"
                        type="text"
                        name="source"
                        onChange={formik.handleChange}
                        value={formik.values.source}
                    />
                    {formik.errors.source ? <div>{formik.errors.source}</div> : null}
                    <TextField
                        id="amount"
                        label="Descripcion"
                        variant="outlined"
                        type="text"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                    />
                    {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                    <Select
                        name="frecuency"
                        label="Frecuencia"
                        onChange={(e) => handleCategoryChange(e)}
                        value={formik.values.frecuency}
                    >
                      
                        {FRECUENCY?.map((frecuency, index) => (
                            <MenuItem
                                key={index}
                                value={frecuency}
                            >{frecuency}
                            </MenuItem  >
                        ))}
                    </Select>
                    {formik.errors.frecuency ? <div>{formik.errors.frecuency}</div> : null}
                    <Button variant="contained" type="submit" >Agregar Ingreso</Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false })
                    navigate('/incomes')
                }}
                modalTitle="¡Creado!"
                modalBody="Ingreso creado exitosamente"
            />
        </Box>
    )
}

export default IncomeForm