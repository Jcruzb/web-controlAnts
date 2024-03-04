import { Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { createProduct } from "../../Services/ProductService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useEffect, useState } from "react";
import { getCategoriesList } from "../../Services/CategoryService";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const ProductsForm = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoriesList()
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Se requiere el nombre del producto'),
            description: Yup.string().min(2).max(50).required('Se requiere la descripcion del producto'),
            category: Yup.string().min(2).max(50).required('Se requiere la categoria del producto'),
        }),
        onSubmit: (values, helpers) => {
            createProduct(values)
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

    const handleCategoryChange = (event) => {
        const value = event.target.innerText.trim(); 
        const valueId = categories.find((category) => category.name === value).id;
        formik.setFieldValue('category', valueId);
    };
    
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
                <Typography variant="h4">Agregar Producto</Typography>
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
                        id="description"
                        label="Descripcion"
                        variant="outlined"
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description ? <div>{formik.errors.description}</div> : null}
                    <Select
                        placeholder="Categoria"
                        name="category"
                        onChange={(e) => handleCategoryChange(e)}
                        value={formik.values.category}
                    >
                        <Option value="" disabled>Selecciona una categoria</Option>
                        {categories.map((category) => (
                            <Option
                                key={category.id}
                                value={category.id}
                            >{category.name}
                            </Option >
                        ))}
                    </Select>
                    {formik.errors.category ? <div>{formik.errors.category}</div> : null}
                    <Button variant="contained" type="submit">Agregar</Button>
                </form>
            </Box>
            <AlertModal
                open={formik.status?.success}
                onClose={() => {
                    formik.setStatus({ success: false })
                    navigate('/products')
                }}
                modalTitle="Success"
                modalBody="Product created successfully"
            />
        </Box>

    );
}

export default ProductsForm;