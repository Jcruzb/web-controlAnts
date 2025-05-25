/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategory, getCategoryById, updateCategory } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const CategoryForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(50).required('Se requiere el nombre de la categoria'),
      description: Yup.string().min(2).max(50).required('Se requiere la descripcion de la categoria'),
    }),
    onSubmit: (values, helpers) => {
      const action = id ? updateCategory(id, values) : createCategory(values);

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
      getCategoryById(id)
        .then((response) => {
          formik.setValues({
            name: response.name || '',
            description: response.description || ''
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
        <Typography variant="h4">{id ? "Editar Categoría" : "Agregar Categoría"}</Typography>
      </Box>
      <Divider sx={{ marginTop: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
        <Card sx={{ padding: 2, width: '50%' }}>
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
            <Button variant="contained" type="submit">{id ? "Editar" : "Agregar"}</Button>
          </form>
        </Card>
      </Box>
      <AlertModal
        open={formik.status?.success}
        onClose={() => {
          formik.setStatus({ success: false })
          navigate('/categorys')
        }}
        modalTitle={id ? "Categoría Editada" : "¡Categoría Creada!"}
        modalBody={id ? "Categoría editada exitosamente" : "Categoría creada exitosamente"}
      />
    </Box>
  );
}

export default CategoryForm;