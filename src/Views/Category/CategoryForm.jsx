import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategory } from "../../Services/CategoryService";
import AlertModal from "../../Components/Modal/AlertModal";
import { useNavigate } from "react-router";

const CategoryForm = () => {

  const navigate = useNavigate();

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
      createCategory(values)
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
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
        <Typography variant="h4">Agregar Categoria</Typography>
      </Box>
      <Divider sx={{marginTop:3}} />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: 2, marginTop: 2 }}>
        <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column', gap:10}}>
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
          <Button variant="contained" type="submit">Agregar</Button>
        </form>
      </Box>
      <AlertModal
        open={formik.status?.success}
        onClose={() => {
          formik.setStatus({ success: false })
          navigate('/categorys')
        }}
        modalTitle="Success"
        modalBody="Category created successfully"
      />
    </Box>
  );
}

export default CategoryForm;