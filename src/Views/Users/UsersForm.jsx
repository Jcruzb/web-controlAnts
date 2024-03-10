import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik"
import * as Yup from "yup"
import { createUser } from "../../Services/UsersService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate } from "react-router";

const UsersForm = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            familyName: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Se requiere el nombre del usuario'),
            email: Yup.string().email('debe ingresar un correo válido').max(50).required('Email is required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Password is required'),
        }),
        onSubmit: (values, helpers) => {
            createUser(values)
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
                })
        },
        status: { success: false }
    })
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4">Agregar Usuario</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nombre y Apellido"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        id="familyName"
                        name="familyName"
                        label="Nombre de Familia"
                        value={formik.values.familyName}
                        onChange={formik.handleChange}
                        error={formik.touched.familyName && Boolean(formik.errors.familyName)}
                        helperText={formik.touched.familyName && formik.errors.familyName}
                    />
                    <Button type="submit" variant="contained" color="primary">Agregar</Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate('/users')}}
                modalTitle={"Usuario agregado"}
                modalBody={"El usuario ha sido agregado exitosamente"}
            />
                </Box>
    )
}

export default UsersForm
