import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido!")
    .required("El correo es requerido!"),
  password: Yup.string()
    .min(6, "Contraseña demasiado corta!")
    .max(256, "Contraseña muy larga!")
    .required("La contraseña es requerida!"),
});
