import { Box, Button, Divider, InputLabel, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { createIncome, updateIncome, getIncomeById } from "../../Services/IncomeService";
import AlertModal from "../../Components/Modal/AlertModal";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { getUsersList } from "../../Services/UsersService";
import { useAuthContext } from "../../Contexts/AuthContext";

const IncomeForm = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const FREQUENCY = ['Mensual', 'Único'];
    const GROUP = ['familiar', 'personal'];
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

    useEffect(() => {
        if (id) {
            getIncomeById(id)
                .then((response) => {
                    formik.setValues({
                        ...response,
                        date: response.date || '' // Aseguramos que "date" tenga un valor inicial
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const formik = useFormik({
        initialValues: {
            source: '',
            amount: 0,
            frequency: '',
            date: '',
            limitDate: '',
            incomeGroup: user.family ? '' : 'personal',
            responsable: '',  // Se usa "responsable" para coincidir con el modelo
            isActive: true,
            status: {
                planeado: true,
                realizado: false
            }
        },
        validationSchema: Yup.object({
            source: Yup.string()
                       .min(2, 'El nombre de la fuente es muy corto')
                       .max(50, 'El nombre de la fuente es muy largo')
                       .required('Se requiere registrar la fuente de ingresos'),
            amount: Yup.number()
                       .min(0, 'El ingreso debe ser mayor a cero')
                       .required('Se requiere el monto'),
            frequency: Yup.string()
                          .oneOf(FREQUENCY)
                          .required('Se requiere la frecuencia del ingreso'),
            incomeGroup: Yup.string().oneOf(GROUP).required('Se requiere seleccionar el grupo de ingreso'),
            date: Yup.date(),
            limitDate: Yup.date().nullable(),
            responsable: Yup.string().required('Seleccione el responsable del ingreso')
        }),
        onSubmit: (values, helpers) => {
            if (id) {
                // Si existe id, actualizamos el ingreso
                updateIncome(id, values)
                    .then(() => {
                        helpers.resetForm();
                        helpers.setStatus({ success: true });
                    })
                    .catch((error) => {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: error.response.data.message });
                        helpers.setSubmitting(false);
                    });
            } else {
                // Caso contrario, creamos el ingreso
                createIncome(values)
                    .then(() => {
                        helpers.resetForm();
                        helpers.setStatus({ success: true });
                    })
                    .catch((error) => {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: error.response.data.message });
                        helpers.setSubmitting(false);
                    });
            }
        },
        status: { success: false }
    });

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Typography variant="h4">{id ? "Editar Ingreso" : "Agregar Ingreso"}</Typography>
            </Box>
            <Divider sx={{ marginTop: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginTop: 2 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <TextField
                        id="source"
                        label="Fuente de ingreso"
                        variant="outlined"
                        type="text"
                        name="source"
                        onChange={formik.handleChange}
                        value={formik.values.source || ''} 
                    />
                    {formik.errors.source && <div>{formik.errors.source}</div>}

                    <TextField
                        id="amount"
                        label="Monto"
                        variant="outlined"
                        type="number"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount || 0}
                    />
                    {formik.errors.amount && <div>{formik.errors.amount}</div>}

                    <InputLabel htmlFor="frequency">Frecuencia del ingreso</InputLabel>
                    <Select
                        name="frequency"
                        label="Frecuencia"
                        onChange={formik.handleChange}
                        value={formik.values.frequency || ''}
                    >
                        {FREQUENCY.map((freq, index) => (
                            <MenuItem key={index} value={freq}>{freq}</MenuItem>
                        ))}
                    </Select>
                    {formik.errors.frequency && <div>{formik.errors.frequency}</div>}

                    <InputLabel htmlFor="incomeGroup">Grupo de ingreso</InputLabel>
                    <Select
                        name="incomeGroup"
                        label="Grupo de ingreso"
                        onChange={formik.handleChange}
                        value={formik.values.incomeGroup || ''}
                    >
                        {GROUP.map((group, index) => (
                            <MenuItem key={index} value={group}>{group}</MenuItem>
                        ))}
                    </Select>
                    {formik.errors.incomeGroup && <div>{formik.errors.incomeGroup}</div>}

                    <InputLabel htmlFor="isActive">¿Ingreso Activo?</InputLabel>
                    <Select
                        name="isActive"
                        value={formik.values.isActive || true}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    {formik.values.isActive === false && (
                        <>
                            <InputLabel htmlFor="limitDate">Fecha límite</InputLabel>
                            <TextField
                                id="limitDate"
                                variant="outlined"
                                type="date"
                                name="limitDate"
                                onChange={formik.handleChange}
                                value={formik.values.limitDate || ''}
                            />
                            {formik.errors.limitDate && <div>{formik.errors.limitDate}</div>}
                        </>
                    )}

                    <InputLabel htmlFor="responsable">Usuario Responsable</InputLabel>
                    <Select
                        name="responsable"
                        label="Usuario"
                        onChange={formik.handleChange}
                        value={formik.values.responsable || ''}
                    >
                        <MenuItem value="" disabled>Selecciona un usuario</MenuItem>
                        {users.map((usr) => (
                            <MenuItem key={usr.id} value={usr.id}>{usr.name}</MenuItem>
                        ))}
                    </Select>
                    {formik.errors.responsable && <div>{formik.errors.responsable}</div>}

                    <Button variant="contained" type="submit">
                        {id ? "Editar Ingreso" : "Agregar Ingreso"}
                    </Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate('/incomes');
                }}
                modalTitle={id ? "Ingreso Editado" : "¡Ingreso Creado!"}
                modalBody={id ? "Ingreso editado exitosamente" : "Ingreso creado exitosamente"}
            />
        </Box>
    );
};

export default IncomeForm;