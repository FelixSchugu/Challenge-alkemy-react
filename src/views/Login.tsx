import Button from "react-bootstrap/Button";
import React from "react";
import FormInput from "../components/atoms/FormInput";
import { Formik, Form } from "formik";
import { loginValidationSchema } from "../helpers/formValidations/loginValidations";
import { useDispatch, useSelector } from "react-redux";
import { UserAuthActions } from "../store/actions/auth";
import { AuthRootState } from "../store/types";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state: AuthRootState) => state.authReducer.isAuth
  );
  const isLoading = useSelector(
    (state: AuthRootState) => state.authReducer.isLoading
  );

  const error = useSelector((state: AuthRootState) => state.authReducer.error);
  const errorMessage = useSelector(
    (state: AuthRootState) => state.authReducer.errorMessage
  );

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    dispatch(UserAuthActions.authUser(values));

    if (isAuth) {
      history.replace("/home");
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 92, 172, 0.06)" }}
      className="bg-gray-200 vw-100 vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={loginValidationSchema}
        render={({ handleChange, values, errors, touched }) => (
          <Form
            className="d-flex justify-content-center align-items-center flex-column bg-white border p-4 shadow-sm"
            style={{ width: "350px" }}
          >
            <h2>Inicio de sesión</h2>
            <FormInput
              label="Ingrese email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              isInvalid={!!errors.email && !!touched.email}
            />

            <FormInput
              label="Ingrese contraseña"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={values.password}
              isInvalid={!!errors.password && !!touched.password}
            />
            {errors.email && touched.email ? (
              <div className="text-danger mb-3">{errors.email}</div>
            ) : null}

            {errors.password && touched.password ? (
              <div className="text-danger mb-3">{errors.password}</div>
            ) : null}

            {isLoading && <div className="mb-3">{"Cargando..."}</div>}
            {error && !isLoading && <div className="text-danger">{errorMessage}</div>}

            <Button
              type="submit"
              style={{ backgroundColor: "rgba(0, 92, 172, 8)" }}
            >
              Iniciar Sesión
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default Login;
