import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, MenuItem, TextField, Typography } from "@mui/material";
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
            kind: '',
            quote: '',
            numberOfQuotes: '',
            amount: '',
            startDate: '',
            limitDate: '',
            debtOwner: '',
            payedUser: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Se requiere el nombre del producto'),
            kind: Yup.string().required('Se requiere el tipo de deuda'),
            quote: Yup.string().min(2).max(50).required('Se requiere el monto de la cuota'),
            numberOfQuotes: Yup.number().min(1).required('Se requiere el número de las cuotas'),
            amount: Yup.string().required('Se requiere el monto total de la deuda'),
            startDate: Yup.date().required('Se requiere la fecha de adquisición de la deuda'),
            limitDate: Yup.date().required('Se requiere la fecha de finalización del pago'),
            debtOwner: Yup.string().required('Se requiere el usuario de la deuda'),
            payedUser: Yup.string().required('Se requiere el usuario que pagará la deuda'),
        }),
        onSubmit: (values, helpers) => {
            values.quote = parseFloat(values.quote.replace(',', '.'));
            values.amount = parseFloat(values.amount.replace(',', '.'));
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

    const handleQuoteChange = (e) => {
        formik.handleChange(e);
        const quote = parseFloat(e.target.value);
        const numberOfQuotes = parseInt(formik.values.numberOfQuotes, 10);

        if (quote > 0 && numberOfQuotes > 0) {
            const amount = quote * numberOfQuotes;
            formik.setFieldValue('amount', amount.toFixed(2));
        }
    };

    const handleNumberOfQuotesChange = (e) => {
        formik.handleChange(e);
        const numberOfQuotes = parseInt(e.target.value, 10);
        const quote = parseFloat(formik.values.quote);

        if (quote > 0 && numberOfQuotes > 0) {
            const amount = quote * numberOfQuotes;
            formik.setFieldValue('amount', amount.toFixed(2));
        }

        const acquisitionDate = new Date(formik.values.date);
        if (acquisitionDate && numberOfQuotes > 0) {
            const limitDate = new Date(acquisitionDate.setMonth(acquisitionDate.getMonth() + numberOfQuotes));
            formik.setFieldValue('limitDate', limitDate.toISOString().split('T')[0]);
        }
    };

    const handleDateChange = (e) => {
        formik.handleChange(e);
        const acquisitionDate = new Date(e.target.value);
        const numberOfQuotes = parseInt(formik.values.numberOfQuotes, 10);

        if (acquisitionDate && numberOfQuotes > 0) {
            const limitDate = new Date(acquisitionDate.setMonth(acquisitionDate.getMonth() + numberOfQuotes));
            formik.setFieldValue('limitDate', limitDate.toISOString().split('T')[0]);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h4">Agregar Deuda</Typography>
            </Box>
            <Card sx={{ width: '100%', maxWidth: 600, padding: 2, marginTop: 2 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nombre"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        id="kind"
                        name="kind"
                        label="Tipo de deuda"
                        value={formik.values.kind}
                        onChange={formik.handleChange}
                        error={formik.touched.kind && Boolean(formik.errors.kind)}
                        helperText={formik.touched.kind && formik.errors.kind}
                        select
                    >
                        <MenuItem value="" disabled>Selecciona un tipo de deuda</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="familiar">Familiar</MenuItem>
                    </TextField>
                    <TextField
                        id="quote"
                        name="quote"
                        label="Cuota"
                        value={formik.values.quote}
                        onChange={handleQuoteChange}
                        error={formik.touched.quote && Boolean(formik.errors.quote)}
                        helperText={formik.touched.quote && formik.errors.quote}
                    />
                    <TextField
                        id="numberOfQuotes"
                        name="numberOfQuotes"
                        label="Número de cuotas"
                        value={formik.values.numberOfQuotes}
                        onChange={handleNumberOfQuotesChange}
                        error={formik.touched.numberOfQuotes && Boolean(formik.errors.numberOfQuotes)}
                        helperText={formik.touched.numberOfQuotes && formik.errors.numberOfQuotes}
                    />
                    <TextField
                        id="amount"
                        name="amount"
                        label="Monto Total"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        disabled
                    />
                    <TextField
                        id="startDate"
                        name="startDate"
                        type="date"
                        label="Fecha de adquisición"
                        value={formik.values.date}
                        onChange={handleDateChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        id="limitDate"
                        name="limitDate"
                        type="date"
                        label="Fecha de finalización del pago"
                        value={formik.values.limitDate}
                        onChange={formik.handleChange}
                        error={formik.touched.limitDate && Boolean(formik.errors.limitDate)}
                        helperText={formik.touched.limitDate && formik.errors.limitDate}
                        InputLabelProps={{ shrink: true }}
                        disabled
                    />
                    <TextField
                        select
                        id="debtOwner"
                        name="debtOwner"
                        label="Usuario responsable"
                        value={formik.values.debtOwner}
                        onChange={formik.handleChange}
                        error={formik.touched.debtOwner && Boolean(formik.errors.debtOwner)}
                        helperText={formik.touched.debtOwner && formik.errors.debtOwner}
                    >
                        <MenuItem value="" disabled>Selecciona un usuario</MenuItem>
                        {users.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >{user.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        id="payedUser"
                        name="payedUser"
                        label="Usuario que paga"
                        value={formik.values.payedUser}
                        onChange={formik.handleChange}
                        error={formik.touched.payedUser && Boolean(formik.errors.payedUser)}
                        helperText={formik.touched.payedUser && formik.errors.payedUser}
                    >
                        <MenuItem value="" disabled>Selecciona un usuario de pago</MenuItem>
                        {users.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >{user.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >Agregar</Button>
                </form>
            </Card>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false });
                    navigate('/debts')
                }}
                modalTitle="Deuda agregada"
                modalBody="La deuda ha sido agregada con éxito"
            />
        </Box>
    );
};

export default DebtForm;