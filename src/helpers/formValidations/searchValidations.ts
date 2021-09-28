import * as Yup from "yup";

export const searchValidationSchema = Yup.object().shape({
  searchValue: Yup.string().required("El valor es requerido"),
});
